import React from 'react';
import {List,Button,Icon,Modal} from 'antd';
import IconText from './../simplecomponents/IconText';
import axios from 'axios';
import {url} from './../../variables/os';
import reqwest from 'reqwest'
const token = localStorage.getItem('token')
class ListP extends React.Component{
    
    state={
        page:1,
        loading:true,
        total:0,
        pages:0,
        data:[],
        visible:false
    }

    showModal = ()=>{
        this.setState({
            visible:true
        });
    };

    handlerOk = e =>{
        
        this.setState({
            visible:false
        })
    }
    
    handlerCancel= e =>{
       
        this.setState({
                visible:false,
               
        });
    };

    fetchData = cb=>{
        reqwest({
            url,
            method:'post',
            type:"json",
            data:{
                query:`
                query{
                    patients(page:${1}){
                        page,
                        pages,
                        hasNext,
                        hasPrev,
                        total,
                        objects{
                            id,
                            nombre,
                            apellidos,
                            edad,
                            birthday
                    }
                    }
                }`
            },
            headers:{
                Authorization:`JWT ${token}`
            },
            success: res => {
                cb(res);
              },

        })
        
    }
    componentDidMount(){
       
      this.fetchData(res=>{
          if(res.data.patients){
            var regex = /(\d+)/g;
            let json = res.data.patients
            let total = json.total.match(regex)[0]
            
            this.setState({
                data:json.objects,
                loading:false,
                total:parseInt(total)
            })

          }else{
              this.setState({
                  loading:false,
                  total:0,
                  data:[]
              })
          }
      })
             

    }  

    onChange=(page=1)=>{
        this.setState({
            loading:true
        })

        const data =  axios({
            url:"http://localhost:8000/graphql/",
            method:"POST",
            data:{
                query:`
                query{
                    patients(page:${page}){
                        page,
                        pages,
                        hasNext,
                        hasPrev,
                        objects{
                            id,
                            nombre,
                            apellidos,
                            edad,
                            birthday
                    }
                    }
                }`
            },
            headers:{
                Authorization:`JWT ${token}`
            }
        })
        
        data.then(res=>{
           
            this.setState({
                loading:false,
                data:res.data.data.patients.objects
            })
        }).catch(error=>{
            console.error(error)
            this.setState({
                loading:true,
                data:[]
            })
        })

    }

   

    render(){
    return(    
        <div>
            <List 
                itemLayout="horizontal"
                loading={this.state.loading}
                dataSource={this.state.data}
                pagination={{
                    onChange:page=>{
                        this.onChange(page)
                    },
                    pageSize:10,
                    total:this.state.total
                }}
                footer={
                    <div>
                        <Button type="primary" style={{background:"#fadb14",color:"#000",borderColor:"#fadb14"}} onClick={this.showModal} ><Icon type="exclamation"/>Ayuda</Button>
                    </div>
                }
                renderItem={item=>(
                    <List.Item
                    key={item.id}
                    actions={[
                        <IconText type="edit" theme="twoTone" direccion="/home/update-paciente" color="#52c41a" id={item.id} />,
                        <IconText type="file-add" color="#52c41a" direccion="/home/expedient-paciente" theme="twoTone" id={item.id}/>,
                        <IconText type="profile" color="#52c41a" direccion="/home/info-paciente" theme="twoTone" id={item.id} />
                    ]}>
                        <List.Item.Meta
                        title={`${item.nombre.toUpperCase()} ${item.apellidos.toUpperCase()}`}
                        description={
                            `Fecha de nacimiento ${item.birthday}   Edad ${item.edad}`
                        }
                        />
                    </List.Item>
                )}
            />

            <Modal
            title="Ayuda"
            visible={this.state.visible}
            onOk={this.handlerOk}
            onCancel={this.handlerCancel}
            >

            </Modal>
        </div>
    )
 }
}

export default ListP