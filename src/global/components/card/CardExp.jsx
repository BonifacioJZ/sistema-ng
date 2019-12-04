import React from 'react';
import { url } from '../../variables/os';
import reqwest from 'reqwest'
import {Link} from 'react-router-dom'
import { Card, Descriptions, Alert, List, Button, Row, Col, Icon,Modal} from 'antd';


const token = localStorage.getItem('token')
class CardExp extends React.Component{

    state ={
        id:this.props.id,
        paciente:[],
        medicinas:[],
        pulso:"",
        temperatura:"",
        respiracion:"",
        precionS:"",
        precionD:"",
        nombre:"",
        titulo:"",
        precioD:"",
        precioS:"",
        fecha:"",
        loading:true,
        color :"",
        precion:"",
        visible:false,
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
            
            let nombre = `${res.data.expedient.pacientes.nombre} ${res.data.expedient.pacientes.apellidos}`;
            
           
            this.setState({
                nombre,
                paciente:res.data.expedient.pacientes,
                medicinas:res.data.expedient.medicinas,
                pulso:res.data.expedient.pulso,
                temperatura:res.data.expedient.temperatura,
                respiracion:res.data.expedient.respiracion,
                precionD:res.data.expedient.precionD,
                precionS:res.data.expedient.precionS,
                titulo:`Expediente Clinico de ${nombre}`.toUpperCase(),
                precioD:this.precionD(res.data.expedient.precionD),
                precioS:this.precionS(res.data.expedient.precionS),
                fecha:res.data.expedient.date,
                loading:false,
                precion:this.grado(res.data.expedient.precionS,res.data.expedient.precionD)
            })
            

        })
    }
    grado =(precions,preciond)=>{
        var precionS = parseInt(precions)
        var precionD = parseInt(preciond)
        if((precionS>= 80 &&precionS<=120) && (precionD>=60&&precionD<=80)  ){
            this.setState({
                color:"success"
            })
            return "normal"
        }
        if((precionS>=121 && precionS<=139)||(precionD>=81 &&precionD<=89 )){
            this.setState({
                color:"warning"
            })
            return "Prehipertensión"
        }
        if((precionS>=140 && precionS<=159)||(precionD>=90 &&precionD<=99 )){
            this.setState({
                color:"warning"
            })
            return "HTA 1"
        }
        if((precionS>=160 && precionS<=179)||(precionD>=100 &&precionD<=109 )){
            this.setState({
                color:"warning"
            })
            return "HTA 2"
        }
        if((precionS>=180 )||(precionD>=110 )){
            this.setState({
                color:"error"
            })
            return "Crisis hipertensiva"
        }
        if((precionS<80 )||(precionD<60 )){
            this.setState({
                color:"error"
            })
            return "Hipotenión"
        }

    }
 precionD =(numero)=>{
     var precio = parseInt(numero)

    if(precio>=60&&precio<=80){
        return "success"
    }
    if(precio>=80 && precio<= 89){
        return "warning"
    }
    if(precio>=90 && precio<=99){
        return "warning"
    }
    if(precio>=100 && precio <= 109){
        return "error"
    }
    if(precio>=110){
        return "error"
    }
    if(precio<60){
        return "error"
    }

 }
 precionS =(numero)=>{
     var precio = parseInt(numero)
     if(precio< 80){
         return "error"
     }
     if(precio>=80&&precio<=120){
         return "success"
     }
     if(precio>120 && precio<=139){
         return "warning"
     }
     if(precio>=140&&precio<=159){
         return "warning"
     }
     if(precio>=160 && precio<=179){
         return "error"
     }
     if(precio>=180){
         return "error"
     }
 }
 fetchData= callback=>{
        reqwest({
            url,
            method:'post',
            type:"json",
            data:{
                query:`
                query{
                   expedient(id:${this.state.id}){
                       pulso,
                       temperatura,
                       respiracion,
                       medicinas{
                           id,
                           nombre,
                           formula,
                           docis
                       },
                       date
                       precionS,
                       precionD,
                       pacientes{
                           id,
                           nombre,
                           apellidos,
                           edad
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
        return (
            <div>
                <Card title={this.state.titulo} >
                    <Descriptions>
                        <Descriptions.Item label="Fecha" > {this.state.fecha} </Descriptions.Item>
                        <Descriptions.Item label="Pulso" > {this.state.pulso}</Descriptions.Item>
                        <Descriptions.Item label="Temperatura" > {this.state.temperatura} </Descriptions.Item>
                        <Descriptions.Item label="Respiracion" > {this.state.respiracion}</Descriptions.Item>
                        <Descriptions.Item label="Precion Sistólica"><Alert message={this.state.precionS} type={this.state.precioS} showIcon /> </Descriptions.Item>
                        <Descriptions.Item label="Precion Diastolica" ><Alert message={this.state.precionD} type={this.state.precioD}  showIcon /></Descriptions.Item>
                        <Descriptions.Item label="Precion" ><Alert message={this.state.precion} type={this.state.color} showIcon /></Descriptions.Item>
                    </Descriptions>
                </Card>
                <br/>
                <Card title="Medicamentos">
                    <List 
                        loading={this.state.loading}
                        dataSource={this.state.medicinas}
                        renderItem={item=>(
                            <List.Item
                                key={item.id}
                                actions ={
                                    [
                                        
                                        <Button onClick={this.showModal} ><Icon  type="profile" theme="twoTone" twoToneColor="#52c41a" /></Button>,

                                    ]
                                }>
                            <List.Item.Meta 
                                title={item.nombre}
                                description={item.formula}
                            />
                                <Modal
                                    title="Docis"
                                    visible={this.state.visible}
                                    onOk={this.handlerOk}
                                    onCancel={this.handlerCancel}>
                                    <p>{item.docis}</p>
                                </Modal>
                            </List.Item>
                        )}
                    />
                </Card>
                <br/>
                <Row justify="center" >
                            <Col offset={10} >
                                <Link to={`/home/notes-expedient/${this.state.id}`} ><Button>Notas</Button></Link>
                            </Col>
                </Row>
            </div>
        )
    }
}

export default CardExp