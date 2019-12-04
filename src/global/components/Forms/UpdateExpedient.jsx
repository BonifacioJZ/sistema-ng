import React from 'react';
import {Form,Input,Col,Row,Button,Select} from 'antd';
import axios from 'axios';
import {url} from './../../variables/os';
import { isNullOrUndefined } from 'util';
const {Option} = Select;

const token  = localStorage.getItem('token')
var children2 =[]
class UpdateExpedient  extends React.Component{

    state={
        children:[],
        id:this.props.id,
        medicinas:[],
        expediente:[]
    }
     async componentDidMount(){
        const data = await axios({
            url,
            method:"POST",
            data:{
                query:`
                query{
                    medicines{
                        id,
                        nombre
                    }
                }`
            },
            headers:{
                Authorization:`JWT ${token}`
            }
            
        })
        const dato = await axios({
            url,
            method:"POST",
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
                           formula
                       },
                       date
                       precionS,
                       precionD,
                   } 
                }`
            },
            headers:{
                Authorization:`JWT ${token}`
            },
        })
        
        children2 =[]
        var datos =[]
        let date = []
        dato.data.data.expedient? datos = await dato.data.data.expedient:datos =[]
        data.data.data.medicines? date = await data.data.data.medicines: date =[]

        
        
        for (let i=0;i<date.length;i++){
            let valor =`${date[i].id}#${date[i].nombre}`
            children2.push(<Option key={date[i].id} value={valor} label={date[i].nombre} >{date[i].nombre}</Option>)
        }
        this.setState({
            children:children2,
            expediente:datos,
            medicinas:datos.medicinas
        })
        
        
        
    }
    handleSubmit = e => {
        e.preventDefault();
        
        this.props.form.validateFields((err, values) => {
          if (!err) {
              
              if(isNullOrUndefined(values.medicine)){
                  
                
                let medicines = []
                for (let i=0;i<this.state.medicinas.length;i++){
                    medicines.push({id:this.state.medicinas[i].id})
                }
               
                let variables ={
                    pulso:values.pulso,
                     temperatura:values.temperatura,
                     respiracion:values.respiracion,
                     precionD:values.presion_d,
                     precionS:values.presion_s,
                     medicinas:medicines
                }
                
                 this.props.mutation({variables:{id:this.state.id,input:variables}}) 
               
              }else{
                
                let  medicines = []
                 for (let i = 0;i<values.medicine.length;i++){
                     let split = values.medicine[i].split("#")
                     medicines.push({id:split[0]})
                 }
                 let variables = {
                     pulso:values.pulso,
                     temperatura:values.temperatura,
                     respiracion:values.respiracion,
                     precionD:values.presion_d,
                     precionS:values.presion_s,
                     medicinas:medicines,
                     
                 }
                
                this.props.mutation({variables:{id:this.state.id,input:variables}}) 
              }
             
          }
        });
      };
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form  layout="horizontal" onSubmit={this.handleSubmit} >
                <Row  type="flex" gutter={24} >
                    <Col xs={24} md={8} span={8} >
                        <Form.Item label="Pulso" >
                            {getFieldDecorator('pulso',{
                                initialValue:this.state.expediente.pulso,
                                rules:[{required:true}]
                            })(<Input placeholder="Pulso" />)}
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8} span={8} >
                        <Form.Item label="Respiracion">
                            {getFieldDecorator('respiracion',{
                                initialValue:this.state.expediente.respiracion,
                                rules:[{required:true}]
                            })(<Input placeholder="Respiracion" />)}
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8} span={8} >
                        <Form.Item label ="Temperatura">
                            {getFieldDecorator('temperatura',{
                                initialValue:this.state.expediente.temperatura,
                                rules:[{required:true}]
                            })(<Input placeholder="Temperatura" />)}
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8} span={8}> 
                            <Form.Item label="Presion Sistolica">
                                {getFieldDecorator('presion_s',{
                                    initialValue:this.state.expediente.precionS,
                                    rules:[{required:true}]
                                })(<Input placeholder="Precion Sistolica"/>)}
                            </Form.Item>
                    </Col>
                    <Col xs={24} md={8} span={8}>
                                <Form.Item label="Precion Diastolica">
                                    {getFieldDecorator('presion_d',{
                                        initialValue:this.state.expediente.precionD,
                                        rules:[{required:true}]
                                    })(<Input placeholder="Precion Diastolica" />)}
                                </Form.Item> 
                    </Col>
                    <Col xs={24}  md={16} span={16} >
                         <Form.Item label="Medicinas">
                             {getFieldDecorator('medicine',{
                                
                             })(<Select
                             mode="multiple"
                             style={{with:'100%'}} 
                             placeholder="Selecione una medicina"
                             >{this.state.children}</Select>)}
                         </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }} >
                            <Button type="primary" htmlType="submit" >
                                Guardar
                            </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default UpdateExpedient  = Form.create({name:'expedient'})(UpdateExpedient )