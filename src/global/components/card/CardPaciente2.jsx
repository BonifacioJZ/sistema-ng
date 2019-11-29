import React from 'react';
import reqwest from 'reqwest'
import { Card, Descriptions, Row, Col, Button, Icon,List } from 'antd';
import { url } from '../../variables/os'; 
import IconText from '../simplecomponents/IconText';





const token = localStorage.getItem('token')

class CardPaciente2 extends React.Component{

    constructor(props){
        super(props);
        this.state={
            id:props.id,
            date:[],
            nombre:"",
            expedientes:[],
            loading:true
        }
    }

    componentDidMount(){
        this.fetchData(res=>{
            let date = res.data.patient
            const nombre= `${date.nombre} ${date.apellidos}` 
            console.log(nombre)
            this.setState({
                nombre:nombre.toUpperCase(),
                date,
                expedientes:date.expedienteSet,
                loading:false
            })
            console.log(this.state.expedientes)
        })
        // 
        
        

    }
    fetchData= callback=>{
        reqwest({
            url,
            method:'post',
            type:"json",
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
                        expedienteSet{
                            id,
                            date
                        }

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
                <Card title={this.state.nombre}>
                    <Descriptions title="Informacion" >
                        <Descriptions.Item label="Fecha de Nacimiento" span={3} >{this.state.date.birthday}</Descriptions.Item>
                        <Descriptions.Item label="Edad" span={3}>{this.state.date.edad}</Descriptions.Item>
                        <Descriptions.Item label="Telefono" span={3} >{this.state.date.telefono}</Descriptions.Item>
                        <Descriptions.Item label="Localidad" span={3}>{this.state.date.estado} {this.state.date.ciudad} {this.state.date.colonia}</Descriptions.Item>
                    </Descriptions>
                </Card>
                <br/>
                    <Row justify="center" >
                        <Col offset={10} >
                            <Button type="primary" onClick={this.props.function}><Icon type="plus" />Crear Expediente</Button>     
                        </Col>
                    </Row>
                    <br/>
                    <Card title="Expedientes" >
                    <List
                        loading={this.state.loading}
                        dataSource={this.state.expedientes}
                        renderItem={item=>(
                            <List.Item
                                key={item.id}
                                actions ={
                                    [
                                        <IconText  direccion="/home/info-expedient"  id={item.id} type="profile" color="#52c41a" theme="twoTone" />,
                                        <IconText  type="edit" theme="twoTone"  color="#52c41a" id={item.id}/>,

                                    ]
                                }>
                                <List.Item.Meta
                                    title={item.date}
                                />
                            </List.Item>
                        )}
                    />
                    </Card>
            </div>
        )
    }
}

export default CardPaciente2