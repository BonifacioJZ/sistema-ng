import React from 'react';
import {Form,Input,Col,Row,Button,Select} from 'antd';
import axios from 'axios';
import {url} from './../../variables/os';
const {Option} = Select;

const token  = localStorage.getItem('token')
var children2 =[]
class AddExpediente extends React.Component{

    state={
        children:[]
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
        children2 =[]
        let date = []
        data.data.data.medicines? date = await data.data.data.medicines: date =[]
       
        
        for (let i=0;i<date.length;i++){
            let valor =`${date[i].id}#${date[i].nombre}`
            children2.push(<Option key={date[i].id} value={valor} label={date[i].nombre} >{date[i].nombre}</Option>)
        }
        this.setState({
            children:children2
        })
        console.log(this.state.children)
        
    }
    handleSubmit = e => {
        e.preventDefault();
        
        this.props.form.validateFields((err, values) => {
          if (!err) {
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
                  paciente:[{id:this.props.id}]
              }
              this.props.mutation({variables:{input:variables}})
             
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
                                rules:[{required:true}]
                            })(<Input placeholder="Pulso" />)}
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8} span={8} >
                        <Form.Item label="Respiracion">
                            {getFieldDecorator('respiracion',{
                                rules:[{required:true}]
                            })(<Input placeholder="Respiracion" />)}
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8} span={8} >
                        <Form.Item label ="Temperatura">
                            {getFieldDecorator('temperatura',{
                                rules:[{required:true}]
                            })(<Input placeholder="Temperatura" />)}
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8} span={8}> 
                            <Form.Item label="Presion Sistolica">
                                {getFieldDecorator('presion_s',{
                                    rules:[{required:true}]
                                })(<Input placeholder="Precion Sistolica"/>)}
                            </Form.Item>
                    </Col>
                    <Col xs={24} md={8} span={8}>
                                <Form.Item label="Precion Diastolica">
                                    {getFieldDecorator('presion_d',{
                                        rules:[{required:true}]
                                    })(<Input placeholder="Precion Diastolica" />)}
                                </Form.Item> 
                    </Col>
                    <Col xs={24}  md={16} span={16} >
                         <Form.Item label="Medicinas">
                             {getFieldDecorator('medicine',{
                                rules:[{required:true}]
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

export default AddExpediente = Form.create({name:'expedient'})(AddExpediente)