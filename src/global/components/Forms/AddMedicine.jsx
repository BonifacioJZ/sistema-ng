import React from 'react';
import { Form, Input, Button, InputNumber } from 'antd';


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
              
               
               let variables  = {
                   nombre: values.name,
                   formula:values.formule,
                   descripcion:values.description,
                   docis:values.docis,
                   stock:values.stock,
                   laboratorio:values.laboratorio
                   

               }
               if (variables.stock===0){
                   variables={
                       ...variables,
                       disponible:false
                   }
               }else{
                   variables ={
                       ...variables,
                       disponible:true
                   }
               }
               this.props.mutation({variables:{input:variables}})
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
                <Form.Item label="Cantidad Disponible" >
                        {getFieldDecorator('stock',{
                            initialValue:0,
                            
                        })(
                            <InputNumber min={0} max={500} />
                        )}
                </Form.Item>
                <Form.Item label="Laboratorio">
                    {getFieldDecorator('laboratorio',{
                        rules:[{
                            required:true,
                            message:"El Laboratorio es Requerido"
                        }]
                    })(<Input 
                        placeholder="Laboratorio"
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