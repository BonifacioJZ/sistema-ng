import React from 'react';
import {List,Button,Icon,Modal, Select, Input, Row} from 'antd';
import IconText from './../simplecomponents/IconText';
import {url} from './../../variables/os';
import reqwest from 'reqwest'

const {Option} = Select
const { Search } = Input;


const token = localStorage.getItem('token')
class ListP extends React.Component{
    
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        
        this.state={
            page:1,
            loading:true,
            total:0,
            pages:0,
            data:[],
            visible:false,
            busqueda:'',
            valor:'nombre'
        }
    
    }


   
    

    showModal = ()=>{
        this.setState({
            visible:true
        });
    };

    showModal2 = ()=>{
        this.setState({
            visible2:true
        });
    };


    

    handlerOk2 = e =>{
        
        this.setState({
            visible2:false
        })
    }
    handlerOk = e =>{
        
        this.setState({
            visible:false
        })
    }
    handlerCancel2= e =>{
       
        this.setState({
                visible2:false,
               
        });
    };

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
                    pacientes{
                        id,
                        nombre,
                        apellidos,
                        edad,
                        birthday
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
          
          if(res.data.pacientes){
           
            let json = res.data.pacientes
           
            
            this.setState({
                data:json,
                loading:false,
                
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

  
     handleChange(value) {
        this.setState({
            valor:value
        })
        console.log(this.state.valor)
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
                        
                    },
                    pageSize:10,
                   
                }}
                footer={
                    <div>
                        <Button type="primary" style={{background:"#fadb14",color:"#000",borderColor:"#fadb14"}} onClick={this.showModal} ><Icon type="exclamation"/>Ayuda</Button>,
                        <Button onClick={this.showModal2}  type="ghost" ><Icon type="search" />Buscar</Button>
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
                title="Buscar"
                visible={this.state.visible2}
                onCancel={this.handlerCancel2}
                onOk={this.handlerOk2}>
                <Row>
                <Select defaultValue="nombre" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                            <Option value="nombre" > Nombre </Option>
                            <Option value="curp">Curo</Option>
                            <Option value="estado">Estado</Option>
                            <Option value="colonia">Colonia</Option>
                            <Option value="municipio" >Municipio</Option>
                        </Select>
                    
                </Row>
                <br/>
                <Row>
                    <Search placeholder="input search text" onSearch={value =>{
                        this.setState({
                            loading:true
                        })

                        this.props.query({variables:{busqueda:value,por:this.state.valor}})
                        setTimeout(()=>{
                            
                            this.setState({
                                loading:false,
                                data:this.props.data.busquedap,
                                visible2:false
                            })
                        },500)
                    }} enterButton />
                </Row>

            </Modal>
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