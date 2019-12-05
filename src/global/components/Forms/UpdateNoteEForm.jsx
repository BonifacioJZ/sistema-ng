import React,{ Component } from "react"
import { Form, Input,Button} from 'antd';
import { url } from '../../variables/os';
import reqwest from 'reqwest'

const token = localStorage.getItem('token')
class UpdateNoteEForm extends Component{
    state = {
        value: '',
        id:this.props.id,
        datos:[]
      };

      componentDidMount(){
        this.fetchData(res=>{
           
            this.setState({
                datos:res.data.noteexpedient
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
                    noteexpedient(id:${this.state.id}){
                        titulo,
                        note,
                        fecha,
                        hora
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
             }
             this.props.mutation({variables:{id:this.state.id,input:variables}})
            
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
                        initialValue:this.state.datos.titulo ,
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
                        initialValue:this.state.datos.note,
                        setFieldsValue:value,
                        rules:[{
                            required:true,
                            message:"La Nota no Puede ir Vacia "}]

                    })(<Input.TextArea 
                         onChange={this.onChange}
                         autosize={{ minRows: 10, maxRows: 100 }} />)}
                </Form.Item>
                <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Actualizar 
                            </Button>
                </Form.Item>
            </Form>
        )
    }
}


export default UpdateNoteEForm = Form.create({name:"note-update"})(UpdateNoteEForm)