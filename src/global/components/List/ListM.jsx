import React from 'react'
import { url } from '../../variables/os';
import reqwest from 'reqwest'
import { List, Icon,Button, Modal,Row,Select,Input } from 'antd';
import IconText from '../simplecomponents/IconText';
import Swal from 'sweetalert2'

const {Option} = Select
const {Search} = Input
const token = localStorage.getItem('token')
class ListM extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            data:[],
            loading:true,
            visible:false,
            valor:'nombre'
        }
        this.delete = this.delete.bind(this)
        this.handleChange = this.handleChange.bind(this)

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
            this.setState({
                data:res.data.medicines,
                loading:false
            })
          
        })
    }
    fetchData= callback=>{
        reqwest({
            url,
            method:'post',
            type:"json",
            data:{
                query:`
                query{
                    medicines{
                        id,
                        nombre,
                        formula   
                      }
                }`
            },
            headers:{
                Authorization:`JWT ${token}`
            },
            success: res => {
                callback(res);
              },

        })
    }
    delete=(id)=>{
        if(id){
            Swal.fire({
                title:"Estas Seguro de Eliminar el Expediente",
                text: "Esta decicion no es Reversible",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#52c41a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si eliminar'
            }).then((result)=>{
                result.value?this.props.mutation({variables:{id:id}}):console.log("No Funciona")
            })
        }

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
                   loading={this.state.loading}
                   dataSource={this.state.data}
                   size="large"
                        pagination={{
                            onChange: page => {
                               
                            },
                            pageSize: 5,
                        }}
                    footer={
                        <Button onClick={this.showModal} ><Icon type="search" />Buscar</Button>
                    }
                   renderItem={item=>(
                       <List.Item
                            key={item.id}
                            actions={[
                                <IconText direccion="/home/medicines-update" id={item.id}   type="edit" theme="twoTone"  color="#52c41a" />,
                                <IconText direccion="/home/medidine-info" id={item.id} type="profile" color="#52c41a"  theme="twoTone"  />,
                                <Button onClick={this.delete.bind(this,item.id)} ><Icon type="delete" theme="twoTone" twoToneColor="#ff4d4f" /></Button>
                            ]}>
                            <List.Item.Meta
                                title={`${item.nombre.toUpperCase()}`}
                                description={
                                    `Formula ${item.formula}`
                                }
                            />

                       </List.Item>
                   )}
               />
               <Modal 
               title="Buscador"
               visible={this.state.visible}
               onOk = {this.handlerOk}
               onCancel = {this.handlerCancel} >
               <Row>
                <Select defaultValue="nombre" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                            <Option value="nombre" > Nombre </Option>
                            <Option value="formula">Formula</Option>
                            <Option value="laboratorio">Laboratorio</Option>
                        </Select>
                    
                </Row>
                <br/>
                <Row>
                    <Search placeholder="Buscar" onSearch={value =>{
                        this.setState({
                            loading:true
                        })

                        this.props.query({variables:{busqueda:value,por:this.state.valor}})
                        setTimeout(()=>{
                            
                            this.setState({
                                loading:false,
                                data:this.props.data.busquedam,
                                visible:false
                            })
                        },500)
                    }} enterButton />
                </Row>

               </Modal>
           </div>
        )
    }
}

export default ListM