import React, {Component} from 'react';
import {Form, Input,InputNumber,Button,Icon,DatePicker} from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
class AddPaciente extends Component{

    
    handlerSubmit = (e) => { 
        e.preventDefault(); 
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){ 
              
                const value={
                    ...values,
                    'date_picker': values['date-picker'].format('YYYY-MM-DD')
                }
               
                let input={
                    nombre:value.name,
                    apellidos:value.last_name,
                    birthday:value.date_picker,
                    edad:value.age,
                    telefono:value.phone,
                    estado:value.state,
                    ciudad:value.city,
                    colonia:value.colonia,
                    curp:value.curp

                }
                this.props.mutation({variables:{input:input}})
            }
            else{
              
            }
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
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
          };
       
        return(
           <Form  layout="vertical" {...formItemLayout} onSubmit={this.handlerSubmit}>
                <Form.Item label="Nombre">
                    {getFieldDecorator('name',{
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
                                rules:[
                                    {
                                        required:true,
                                        message:'La Curp es Requerida'
                                    }
                                ]
                            })(<Input placeholder="Curp" />)}

                </Form.Item>
                <Form.Item label="Fecha de nacimiento">
                            {getFieldDecorator('date-picker',
                            config)(<DatePicker locale={locale}/>)}
                </Form.Item>
                <Form.Item label="Edad">
                {getFieldDecorator('age', 
                { 
                    initialValue: 0,
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
                                
                            })(<Input 
                            prefix={<Icon type="phone" style={{color:'rgba(0,0,0,.25)'}}/>}
                            placeholder="Telefono" 
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
                                Registrar
                            </Button>
                </Form.Item>
           </Form>
        );
    };
};

export default AddPaciente = Form.create({name:'register'})(AddPaciente);