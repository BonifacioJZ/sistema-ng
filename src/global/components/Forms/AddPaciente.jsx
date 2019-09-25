import React, {Component} from 'react';
import {Form, Input,Button,Select,Icon} from 'antd';

class AddPaciente extends Component{
    handlerSubmit = (e) => { 
        e.preventDefault(); 
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err) console.log('Recived Values of from',values);
            else{
                console.log(err)
            }
        })
    }
    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout ={
            labelCol:{
                xs:{span:28},
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
                    span:16,
                    offset:8,
                },
            },
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
           <Form {...formItemLayout} onSubmit={this.handlerSubmit}>
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