import React from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import reqwest from 'reqwest'
import { url } from '../../variables/os';

const token = localStorage.getItem('token')
class UpdateMedicineForm extends React.Component{

    state = {
        value: '',
        id:this.props.id,
        datos:[]
      };
    
      onChange = ({ target: { value } }) => {
        this.setState({ value });
      };

      componentDidMount(){
          this.fetchData(res=>{
              
              this.setState({
                  datos:res.data.medicina
              })
              console.log(this.state)
          })
      }

      fetchData= callback=>{
        reqwest({
            url,
            method:'post',
            type:"json",
            data:{
                query:`
                query{
                    medicina(id:${this.state.id}){
                        nombre,
                        formula,
                        docis,
                        descripcion,
                        laboratorio,
                        stock,  
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
               console.log(variables)
               this.props.mutation({variables:{id:this.state.id,input:variables}})
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
                        initialValue:this.state.datos.nombre,
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
                        initialValue:this.state.datos.formula,
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
                        initialValue:this.state.datos.descripcion,
                        rules:[{
                            required:true,
                            message:"Se Requiere una Descripcion del medicamento"}]

                    })(<Input.TextArea 
                         placeholder="Descripcion"
                         onChange={this.onChange}
                          />)}
                </Form.Item>
                <Form.Item  label="Dosis" >
                    {getFieldDecorator('docis',{
                        initialValue:this.state.datos.docis,
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
                            initialValue:this.state.datos.stock,
                            
                        })(
                            <InputNumber min={0} max={500} />
                        )}
                </Form.Item>
                <Form.Item label="Laboratorio">
                    {getFieldDecorator('laboratorio',{
                        initialValue:this.state.datos.laboratorio,
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

export default UpdateMedicineForm = Form.create({name:'update'})(UpdateMedicineForm);