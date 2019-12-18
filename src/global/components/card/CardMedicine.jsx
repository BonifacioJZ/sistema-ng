import React from 'react'
import { url } from '../../variables/os';
import reqwest from 'reqwest'
import {Card,Descriptions} from 'antd'
const token = localStorage.getItem('token')
class CardMedicine extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.id,
            datos:[],
            nombre:""
        }
    }
    componentDidMount(){
        this.fetchData(res=>{
            const nombre = res.data.medicina.nombre.toUpperCase()
            this.setState({
                datos:res.data.medicina,
                nombre
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
                    medicina(id:${this.state.id}){
                        nombre,
                        formula,
                        laboratorio,
                        disponible,
                        docis,
                        stock,
                        descripcion
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
    render(){
        return(
            <div>
                <Card title={this.state.nombre} >
                    <Descriptions title="Informacion" bordered >
                        <Descriptions.Item label="Laboratorio" >{this.state.datos.laboratorio}</Descriptions.Item>
                        <Descriptions.Item  label="Cantidad Disponible" span={3}  >{this.state.datos.disponible?this.state.datos.stock:`No se ecuentra disponible`}</Descriptions.Item>
                        <Descriptions.Item label="Descripcion" span={3} >{this.state.datos.descripcion}</Descriptions.Item>
                        <Descriptions.Item label="Formula"> {this.state.datos.formula} </Descriptions.Item>
                        <Descriptions.Item label="dosis" > {this.state.datos.docis} </Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
        )
    }
}
export default CardMedicine