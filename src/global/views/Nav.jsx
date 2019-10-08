import React,{Component} from 'react';
import { Layout, Menu,  Icon,Switch } from 'antd';
import Home from './Home';
//import AddPacienteView from './AddPacienteView';
const {Sider,Footer } = Layout;
const {SubMenu} = Menu;



class Nav extends Component {

  state ={
    theme:"dark",
  }
  changeTheme = value =>{
    this.setState({
      theme:value?'dark':'light',
    });
  };
 
  render(){
      return (
        <Layout className="layout" style={{ minHeight: '100vh' }} >
         <Sider 
          style={{background:""}}
          breakpoint="lg"
          collapsedWidth="80"
          theme={this.state.theme}
          onBreakpoint={broken=>{
            console.log(broken)
          }}
          onCollapse={(collapse,type)=>{
            console.log(collapse,type)
          }}>
            <div className="logo"/>
            <Menu
              theme={this.state.theme}
              mode="inline"
              defaultSelectedKeys={['1']}>
              <SubMenu
                key="1"
                title={
                  <span>
                    <Icon type="user"/>
                    <span className="nav-text">Paciente</span>
                  </span>
                }>
                <Menu.Item>Nav 1</Menu.Item>
                <Menu.Item>Nav 2</Menu.Item>
              </SubMenu>
              <SubMenu
                key="2"
                title={
                  <span>
                    <Icon type="team" />
                    <span className="nav-text">Pacientes</span>
                  </span>
                }>
                <Menu.Item>
                  nav 1
                </Menu.Item>
                <Menu.Item>
                  nav2
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="3">
                <Icon type="upload"/>
                <span className="nav-text">nav 3</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="user" />
                <span className="nav-text">nav 4</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="bg-colors" />
                    <span>Tema</span>
                  </span>
                }>
                <Menu.Item>
                  <Switch 
                    checked={this.state.theme==="dark"}
                    onChange={this.changeTheme}
                  />
                </Menu.Item>
              </SubMenu>
            </Menu>
         </Sider>
         <Layout className="layout">
           <Home/>
          <Footer style={{ textAlign: 'center' }}>Bonifacio Juarez Ceja ©</Footer>
         </Layout>
        </Layout>

    );
    
    }
}

export default Nav
