import React from 'react';
import { Form, Input, Button, } from 'antd';


class AddMedicine extends React.Component{

    state = {
        value: '',
      };
    
      onChange = ({ target: { value } }) => {
        this.setState({ value });
      };

    handlerSubmit = (e) => { 
        e.preventDefault(); 
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){ 
              
               console.log(values)
            }
            else{
              
            }
        })

    }
    render(){
        const {getFieldDecorator} = this.props.form;
        const { value } = this.state;
        return(
           <Form onSubmit={this.handlerSubmit}>
                <Form.Item label="Nombre">
                    {getFieldDecorator('name',{
                        rules:[
                            {
                                required: true,
                                message:'El Nombre del Medicamento es Requerido',
                            },
                        ],
                    })(<Input 
                        placeholder="Nombre" />)}
                </Form.Item>
                <Form.Item label="Formula">
                    {getFieldDecorator('formule',{
                        rules:[
                            {
                                required:true,
                                message:"Se Requiere la Formula de la Medicina"
                            }
                        ]
                    })(<Input 
                        placeholder="Formula" />)}
                </Form.Item>
                <Form.Item  label="Descripcion" >
                    {getFieldDecorator('description',{
                        setFieldsValue:value,
                        rules:[{required:true,
                            message:"Se Requiere una Descripcion del medicamento"}]

                    })(<Input.TextArea 
                         placeholder="Descripcion"
                         onChange={this.onChange}
                          />)}
                </Form.Item>
                <Form.Item  label="Docis" >
                    {getFieldDecorator('docis',{
                        setFieldsValue:value,
                        rules:[{required:true,
                            message:"Se Requiere una la docis del medicamento"}]

                    })(<Input.TextArea 
                        placeholder="Docis"
                         onChange={this.onChange}
                         />)}
                </Form.Item>
                <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Registrar
                            </Button>
                </Form.Item>
           </Form>
        )
    }
}

export default AddMedicine = Form.create({name:'register'})(AddMedicine);