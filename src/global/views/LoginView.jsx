import React from 'react';
import { Layout, PageHeader,Tag,Row,Col,Card} from 'antd';
import Login from '../components/Forms/Login'
import {useMutation} from '@apollo/react-hooks';
import Auth from '../variables/auth';
import swal from 'sweetalert';
import  {USER_LOGIN} from '../Querys/Query';
const {Header,Content,Footer} = Layout;



function LoginView(props)  {

  const [login]= useMutation(USER_LOGIN,{
    onCompleted(data){
      console.log(data)
     
        Auth.login(()=>{
          sessionStorage.setItem('session',1)
          props.history.push("/home")
          sessionStorage.setItem('token',data.tokenAuth.token)
          
        });
    },
    onError(error){
      Auth.logout(()=>{
        console.log(error)
        console.log(Auth.isAuthentication())
        sessionStorage.clear();
      })
      swal({
          title:"Error",
          icon:"error"
        })
    }
  })
 
      return (
        <Layout className="layout" style={{ minHeight: '100vh' }} >
         <Header style={{ background: '#fff', padding: 0 }} >
            <PageHeader 
            tags={<Tag color="blue">Bienvenido</Tag>}
            title="Sistema NG"/>
         </Header>
         <Content style={{ padding: '0 50px' }} >
         <br></br><br></br>
         <Row type="flex" justify="center">
          <div style={{ background: '#fff', padding: 24, minHeight: 280, }}>
           
              <Col>
                <Card>
                <Login mutation={login}/>
                </Card>
              </Col>
            
            </div>
          </Row>
         </Content>
         <Footer style={{ textAlign: 'center' }}>Bonifacio Juarez Ceja © </Footer>
        </Layout>

    );
    
    
}

export default LoginView;
