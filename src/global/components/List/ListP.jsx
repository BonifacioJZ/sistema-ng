import React from 'react';
import {List,Button,Icon,Modal} from 'antd';
import IconText from './../simplecomponents/IconText';
import axios from 'axios';
class ListP extends React.Component{
    
    state={
        page:1,
        loading:true,
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
    async componentDidMount(){
        const data = await axios({
            url:"http://localhost:8000/graphql/",
            method:"POST",
            data:{
                query:`
                query{
                    patients(page:${1}){
                        page,
                        pages,
                        hasNext,
                        hasPrev,
                        objects{
                            id,
                            nombre,
                            apellidos,
                            edad,
                            ciudad,
                            colonia
                    }
                    }
                }`
            },
            
        })
       const json =  await data.data.data.patients.objects
       this.setState({
           data:json,
           loading:false
       })
       console.log(this.state.data)
        
        

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
            }
        })
        data.then(res=>{
            console.log(res)
            this.setState({
                loading:false,
                data:res.data.data.patients.objects
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
                    total:10
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
                        <IconText type="edit" theme="twoTone" id={item.id} />,
                        <IconText type="file-add" theme="twoTone"/>,
                        <IconText type="read" theme="filled"/>
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