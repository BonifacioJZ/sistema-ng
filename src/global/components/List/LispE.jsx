import React from 'react'
import { url } from '../../variables/os';
import reqwest  from 'reqwest'
import { List, Button, Icon, Modal, Row, Input } from 'antd';
import IconText from '../simplecomponents/IconText';


const {Search} = Input
const token = localStorage.getItem('token')
class LispE extends React.Component{

    constructor(props){
        super(props)
        this.state={
            datos:[],
            loading:true,
            visible:false
        }
        
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
    componentDidMount(){
        this.fetchData(res=>{
            console.log(res)
            this.setState({
                datos:res.data.expedients,
                loading:false
            })
        })
        
    }
    fetchData = cb=>{
        reqwest({
            url,
            method:'post',
            type:"json",
            data:{
                query:`
                query{
                    expedients{
                        id,
                        hoara,
                        date,
                         pacientes{
                            nombre,
                            apellidos
                            curp,
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
    render(){
        return(
            <div>
                <List 
                    footer={
                        <Button onClick={this.showModal} > <Icon type="search" /> Buscar</Button>
                    }
                    loading={this.state.loading}
                    dataSource={this.state.datos}
                    pagination={{
                    onChange:page=>{
                        
                    },
                    pageSize:10,
                   
                    }}
                    renderItem ={item=>(
                        <div>
                            <List.Item
                                key={item.id}
                                
                                actions={[
                                    <IconText  direccion="/home/info-expedient"  id={item.id} type="profile" color="#52c41a" theme="twoTone" />,
                                        <IconText direccion="/home/edit-expedient" id={item.id} type="edit" theme="twoTone"  color="#52c41a" />,
                                        
                                ]}>
                                    <List.Item.Meta
                                    title={item.date}
                                    description={`Fecha ${item.date}  Hora ${item.hoara}`}
                                    />
                            </List.Item>
                            <Modal
                                title="Buscador"
                                visible={this.state.visible}
                                onOk = {this.handlerOk}
                                onCancel = {this.handlerCancel} >
                                <Row>
                                <Search placeholder="Buscar" onSearch={value =>{
                                    this.setState({
                                        loading:true
                                    })

                                    this.props.query({variables:{por:value}})
                                    
                                    setTimeout(()=>{
                                        
                                        this.setState({
                                            loading:false,
                                            datos:this.props.data.busquedae[0].expedienteSet,
                                            visible:false
                                        })
                                    },500)
                                }} enterButton />
                                </Row>

                                </Modal>
                        </div>
                    )}
                />
            </div>
        )
    }
}

export default LispE