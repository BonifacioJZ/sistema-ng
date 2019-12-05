import React from 'react'
import { url } from '../../variables/os';
import reqwest from 'reqwest'
import { Descriptions } from 'antd';


const token = localStorage.getItem('token')
export default class CardNoteE extends React.Component{
    state={
        id:this.props.id,
        datos:[]
    }
    
    componentDidMount(){
        this.fetchData(res=>{
           
            this.setState({
                datos:res.data.noteexpedient
            })
            console.log(this.state)
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
                    noteexpedient(id:${this.state.id}){
                        titulo,
                        note,
                        fecha,
                        hora
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
                <Descriptions title={this.state.datos.titulo}  layout="vertical" bordered>
                    <Descriptions.Item label="Fecha" span={2} >{this.state.datos.fecha}</Descriptions.Item>
                    <Descriptions.Item  label="Hora" span={2} >{this.state.datos.hora}</Descriptions.Item>
                    <Descriptions.Item label="Nota" span={4} ><p>{this.state.datos.note}</p></Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}