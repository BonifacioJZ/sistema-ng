import React, {Component} from 'react';
import {Form, Input,InputNumber,Button,Select,Icon,DatePicker} from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import { url } from '../../variables/os';
import reqwest from 'reqwest'

class UpdatePaciente extends Component{

    state={
        id:this.props.id,
        paciente:[]
    }
    handlerSubmit = (e) => { 
        e.preventDefault(); 
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){ 
              
                if(values.fecha){
                    const value={
                    ...values,
                    'fecha': values['fecha'].format('YYYY-MM-DD')
                    }
                
                    let input ={
                        nombre:value.name,
                        apellidos:value.last_name,
                        birthday:value.fecha,
                        edad:value.age,
                        telefono:value.phone,
                        estado:value.state,
                        ciudad:value.city,
                        colonia:value.colonia,
                        curp:value.curp

                    }
                    
                    this.props.mutation({variables:{id:this.state.id,input:input}})
               
                }else{
                    const value ={
                        ...values,
                        'fecha':this.state.paciente.birthday
                    }
                    let input ={
                        nombre:value.name,
                        apellidos:value.last_name,
                        birthday:value.fecha,
                        edad:value.age,
                        telefono:value.phone,
                        estado:value.state,
                        ciudad:value.city,
                        colonia:value.colonia,
                        curp:value.curp

                    }
                    console.info(input)
                    this.props.mutation({variables:{id:this.state.id,input:input}})
                }
                
                
            }
            else{
              
            }
        })

    }
     componentDidMount(){
        this.fetchData(res=>{
            this.setState({
                paciente:res.data.patient
            })
        })
       
        
    }
    fetchData = callback =>{
        const token = localStorage.getItem('token')
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
                        curp


                        }
                    }
                `
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
        
        const {getFieldDecorator} = this.props.form;
    
        const formItemLayout ={
            labelCol:{
                xs:{span:20},
                sm:{span:8}
            },
            wrapperCol:{
                xs:{span:24},
                sm:{span:16}
            }
        }
        const tailFormItemLayout ={
            wrapperCol:{
                xs:{
                    span:24,
                    offset:0,
                },
                sm:{
                    span:20,
                    offset:8,
                },
            },
        };
        const config = {
            
            rules: [{ type: 'object', required: false, message: 'Please select time!' }],
          };
       
        const prefixSelector = getFieldDecorator('prefix',{
            initialValue:'52',
        })(
            <Select style={{width:70}}>
                <Select.Option value="52">+52</Select.Option>
                <Select.Option value="1">+1</Select.Option>
            </Select>
        );
        return(
           <Form  layout="vertical" {...formItemLayout} onSubmit={this.handlerSubmit}>
                <Form.Item label="Nombre">
                    {getFieldDecorator('name',{
                        initialValue:this.state.paciente.nombre,
                        rules:[
                            {
                                required: true,
                                message:'El Nombre es Requerido',
                            },
                        ],
                    })(<Input
                        prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />}
                        placeholder="Nombre"
                    />)}
                </Form.Item>
                <Form.Item label="Apellidos">
                        {getFieldDecorator('last_name',{
                            initialValue:this.state.paciente.apellidos,
                            rules:[
                                {
                                    required:true,
                                    message:"Los Apellidos son Requeridos"
                                }
                            ]
                        })(<Input 
                            placeholder="Apellidos"
                        />)}
                        
                </Form.Item>
                <Form.Item label="Curp">
                            {getFieldDecorator('curp',{
                                initialValue:this.state.paciente.curp,
                                rules:[
                                    {
                                        required:true,
                                        message:'La Curp es Requerida'
                                    },
                                    {
                                        max:18,
                                        message:"La Curp debe tener un Maximo de 18 Caracteres"
                                    }
                                ]
                            })(<Input placeholder="Curp" />)}

                </Form.Item>
                <Form.Item label="Fecha de nacimiento">
                            {getFieldDecorator('fecha',
                            config)(<DatePicker locale={locale}/>)}
                </Form.Item>
                <Form.Item label="Edad">
                {getFieldDecorator('age', 
                { 
                    initialValue: this.state.paciente.edad,
                    rules:[
                        {required:true,message:"La Edad es Requerida"}
                    ] 
                },
                )(
                    <InputNumber min={0} max={204} />
                )}
                </Form.Item>
                <Form.Item label="Numero de Telefono">
                            {getFieldDecorator('phone',{
                                initialValue:this.state.paciente.telefono,
                                rules:[{
                                    
                                        max:14,
                                        message:"El Telefono debe tener un Maximo de 14 Caracteres"
                                    
                                }]
                               
                            })(<Input 
                            prefix={<Icon type="phone" style={{color:'rgba(0,0,0,.25)'}}/>}
                            placeholder="Telefono"
                            addonBefore={prefixSelector} 
                            style={{width:'100%'}} 
                            />)
                            }
                </Form.Item>
                <Form.Item label="Direccion" />
                <Form.Item label="Estado">
                            {getFieldDecorator('state',{
                                initialValue:"Michoacan",
                                rules:[{
                                    required:true,
                                    message:'El estado es requerido'
                                }]
                            })(<Input/>)}
                </Form.Item>
                <Form.Item label="Ciudad">
                            {getFieldDecorator('city',{
                                initialValue:"Coeneo",
                                rules:[{
                                    required:true,
                                    message:'La Ciudad es Requerida'
                                }]
                            })(<Input/>)}
                </Form.Item>
                <Form.Item label="Colonia o Municipio">
                            {getFieldDecorator('colonia',{
                                initialValue:"San Pedro Tacaro",
                                rules:[{
                                    required:true,
                                    message:'La Colonia o Municipio es Requerido'
                                }]
                            })(<Input/>)}
                </Form.Item>
                <Form.Item>

                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Actualizar
                            </Button>
                </Form.Item>
           </Form>
        );
    };
};

export default UpdatePaciente = Form.create({name:'register'})(UpdatePaciente);