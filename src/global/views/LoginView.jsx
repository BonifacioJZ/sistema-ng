import React,{Component} from 'react';
import { Layout, PageHeader,Tag,Row,Col,Card} from 'antd';
import Login from '../components/Forms/Login'
import {gql} from 'apollo-boost';
import {useMutation} from '@apollo/react-hooks';
const {Header,Content,Footer} = Layout;


 const USER_LOGIN = gql`
                    mutation Login($input:LoginInput!){
                        login(input:$input){
                            ok,
                            user{
                              username,
                              email
                            }
                        }
                        
                    }
                `
function LoginView()  {

  const [login,{mutationError}]= useMutation(USER_LOGIN,{
    onCompleted(data){
      console.log(data)
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
