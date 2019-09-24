import React,{Component} from 'react';
import { Layout, Menu,  Icon } from 'antd';
import Head from './../components/Head';
import Switc from './../components/Switc';
const { Header, Content, Footer,Sider } = Layout;


class Home extends Component {
 
  render(){
      return (
        <Layout className="layout" style={{ minHeight: '100vh' }} >
         <Sider 
          style={{background:""}}
          breakpoint="lg"
          collapsedWidth="80"
          theme="dark"
          onBreakpoint={broken=>{
            console.log(broken)
          }}
          onCollapse={(collapse,type)=>{
            console.log(collapse,type)
          }}>
            <div className="logo"/>
            <Menu
              theme="dark"
              mode="vertical"
              defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user"/>
                <span className="nav-text">nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera"/>
                <span className="nav-text">nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload"/>
                <span className="nav-text">nav 3</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="user" />
                <span className="nav-text">nav 4</span>
              </Menu.Item>
              <Menu.Item>
                <Switc/>
              </Menu.Item>
            </Menu>
         </Sider>
          <Layout className="layout">
            <Header style={{ background: '#fff', padding: 0 }}>
              <Head name="Sistema NG"  />
            </Header>
            <Content style={{ margin: '24px 16px 0' }} >
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>content</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>

    );
    
    }
}

export default Home