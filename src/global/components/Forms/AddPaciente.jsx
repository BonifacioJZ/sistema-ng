import React, {Component} from 'react';
import {Form, Input,InputNumber,Button,Select,Icon,DatePicker} from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
class AddPaciente extends Component{

    
    handlerSubmit = (e) => { 
        e.preventDefault(); 
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){ 
                console.log('Recived Values of from',values);
                const value={
                    ...values,
                    'date-picker': values['date-picker'].format('YYYY-MM-DD')
                }
                console.log(value)
            }
            else{
                console.log(err)
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
                                rules:[{required:true,message:'El Numero de Telefono es Requerido'}]
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
                                Register
                            </Button>
                </Form.Item>
           </Form>
        );
    };
};

export default AddPaciente = Form.create({name:'register'})(AddPaciente);