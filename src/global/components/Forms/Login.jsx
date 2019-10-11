import React ,{Component}from 'react';
import {Form,Icon,Input,Button} from 'antd';


 class Login extends Component{

    render(){
        //const [login,{mutationError}]= useMutation(USER_LOGIN)
        const  handleSubmit = (e) => { 
        e.preventDefault(); 
        this.props.form.validateFields((err,values)=>{
            if(err)console.err(err)
            else{
                let user ={
                    username:values.username,
                    password:values.password
                }
                this.props.mutation({variables:{input:user}})
            }

        })
    }
        const {getFieldDecorator}= this.props.form;
        return (
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username',{
                        rules:[
                            {required:true,message:'Por favor introduzca  su Nombre de Usuario '},
                            ]
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}}/>}
                            placeholder="Nombre de usuario"/>,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password',{
                        rules:[{required:true,message:'Por favor introduzca su Contraseña'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color:'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit"  className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
export default Login = Form.create({ name: 'normal_login' })(Login);