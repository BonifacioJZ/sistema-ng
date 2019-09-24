import React,{Component} from 'react';
import { Layout, PageHeader,Tag,Row,Col,Card} from 'antd';
import Login from '../components/Forms/Login'
const {Header,Content,Footer} = Layout;

class LoginView extends Component {
 
  render(){
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
                <Login/>
                </Card>
              </Col>
            
            </div>
          </Row>
         </Content>
         <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>

    );
    
    }
}

export default LoginView;
