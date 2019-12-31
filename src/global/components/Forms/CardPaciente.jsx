import React from 'react';
import axios from 'axios';
import {Card,Descriptions} from 'antd';
import { url } from '../../variables/os'; 

const token = localStorage.getItem('token')

class CardPaciente extends React.Component{

    constructor(props){
        super(props);
        this.state={
            id:props.id,
            date:[],
            nombre:""
        }
    }

    async componentDidMount(){
        const data = await axios({
            url,
            method:"POST",
            data:{
                query:`
                query{
                    patient(id:${this.state.id}){
                        nombre,
                        apellidos,
                        edad,
                        telefono,
                        birthday,
                        ciudad,
                        colonia,
                        estado,
                        curp


                    }
                }`
            },
            headers:{
                Authorization:`JWT ${token}`
            }
        })
        let date 
        data.data.data.patient?date = await data.data.data.patient:date=[]
        const nombre= `${date.nombre} ${date.apellidos}`
        
        this.setState({
            date,
            nombre:nombre.toUpperCase()
        })

    }
    render(){
        return(
            <div>
                <Card title={this.state.nombre}>
                    <Descriptions title="Informacion" >
                        <Descriptions.Item label="Curp">{this.state.date.curp}</Descriptions.Item>
                        <Descriptions.Item label="Fecha de Nacimiento" span={3} >{this.state.date.birthday}</Descriptions.Item>
                        <Descriptions.Item label="Edad" span={3}>{this.state.date.edad}</Descriptions.Item>
                        <Descriptions.Item label="Telefono" span={3} >{this.state.date.telefono}</Descriptions.Item>
                        <Descriptions.Item label="Localidad" span={3}>{this.state.date.estado} {this.state.date.ciudad} {this.state.date.colonia}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
        )
    }
}

export default CardPaciente