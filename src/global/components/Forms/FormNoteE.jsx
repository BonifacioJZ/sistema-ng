import React,{ Component } from "react"
import { Form, Input,Button} from 'antd';

class FormNoteE extends Component{
    state = {
        value: '',
      };
    
      onChange = ({ target: { value } }) => {
        this.setState({ value });
      };
    
    handleSubmit = e => {
        e.preventDefault();
        
        this.props.form.validateFields((err, values) => {
          if (!err) {
             let variables ={
                 titulo:values.tittle,
                 nota:values.note,
                 expediente:[{id:this.props.id}]
             }
             console.log(variables)
             this.props.mutation({variables:{input:variables}})
          }
        });
      };
    render(){
        const {getFieldDecorator} = this.props.form;
        const { value } = this.state;
        return(
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                <Form.Item label="Titulo" >
                    {getFieldDecorator('tittle',{
                        rules:[ {
                            required:true,
                            message:"La Nota Necesita un Titulo"
                        },
                        {
                            max:100,
                            message:"El Titulo debe tener un Maximo de 100 Caracteres"
                        }]
                    })(<Input placeholder="Titulo" />)}
                </Form.Item>    
                <Form.Item  label="Nota" >
                    {getFieldDecorator('note',{
                        setFieldsValue:value,
                        rules:[{required:true}]

                    })(<Input.TextArea 
                         onChange={this.onChange}
                         autosize={{ minRows: 10, maxRows: 100 }} />)}
                </Form.Item>
                <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Regitrar
                            </Button>
                </Form.Item>
            </Form>
        )
    }
}


export default FormNoteE = Form.create({name:"note-create"})(FormNoteE)