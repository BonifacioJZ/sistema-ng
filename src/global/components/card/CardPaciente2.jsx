import React from 'react';
import reqwest from 'reqwest'
import { Card, Descriptions, Row, Col, Button, Icon,List } from 'antd';
import { url } from '../../variables/os'; 
import IconText from '../simplecomponents/IconText';
import Swal from 'sweetalert2'
import ButtonGroup from 'antd/lib/button/button-group';




const token = localStorage.getItem('token')

class CardPaciente2 extends React.Component{

    constructor(props){
        super(props);
        this.delete = this.delete.bind(this)
        
        this.state={
            id:props.id,
            date:[],
            nombre:"",
            expedientes:[],
            loading:true,
            familiar:false,
            shownodal:false,
            crear:this.props.crear
        }
    }

    componentDidMount(){
        this.fetchData(res=>{
            let date = res.data.patient
            const nombre= `${date.nombre} ${date.apellidos}` 
            let familiar = false
            if(date.encasoDeEmergencia.length===0) familiar= false
            else familiar= true
             
            
            this.setState({
                nombre:nombre.toUpperCase(),
                date,
                expedientes:date.expedienteSet,
                loading:false,
                familiar
            })
           
           
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
                        },
                        encasoDeEmergencia{
                            nombre,
                            apellidos,
                            telefono
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
    showModal=()=>{
        if(this.state.familiar){
            this.setState({
                showModal:true
            })
        }else{
            window.history.pushState("")
        }
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
                <br/>
                    <Row justify="center" >
                        <Col offset={10} >
                            <ButtonGroup>
                                <Button type="primary" onClick={this.props.function}><Icon type="plus" />Crear Expediente</Button> 
                                <Button type="primary" onClick={this.state.familiar===false?this.props.crear:this.showModal} >Familiar</Button>
                            </ButtonGroup>    
                        </Col>
                    </Row>
                    <br/>
                    <Card title="Expedientes" >
                    <List
                        loading={this.state.loading}
                        dataSource={this.state.expedientes}
                        size="large"
                        pagination={{
                            onChange: page => {
                               
                            },
                            pageSize: 5,
                        }}
                        renderItem={item=>(
                            <List.Item
                                key={item.id}
                                actions ={
                                    [
                                        <IconText  direccion="/home/info-expedient"  id={item.id} type="profile" color="#52c41a" theme="twoTone" />,
                                        <IconText direccion="/home/edit-expedient" id={item.id} type="edit" theme="twoTone"  color="#52c41a" />,
                                        <Button onClick={this.delete.bind(this,item.id)} > <Icon type="delete" theme="twoTone" twoToneColor="#f5222d" /> </Button>,

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