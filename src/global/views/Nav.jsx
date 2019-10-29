import React from 'react';
import { Layout, Menu,  Icon } from 'antd';
import Home from './Home';
import {Switch as Case,Route,Link} from 'react-router-dom';
import {ProtectedRoutes} from '../routes/ProtectedRoutes';
import AddPacienteView from './AddPacienteView';
import ListPaciente from './ListPaciente';

const {Sider,Footer } = Layout;
const {SubMenu} = Menu;





function Nav() {
  
      return (
        <Layout className="layout" style={{ minHeight: '100vh' }} >
         <Sider 
          style={{background:""}}
          breakpoint="lg"
          collapsedWidth="80"
          onBreakpoint={broken=>{
            console.log(broken)
          }}
          onCollapse={(collapse,type)=>{
            console.log(collapse,type)
          }}>
            <div className="logo"/>
            <Menu
              theme="dark"
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
                <Menu.Item><Link to="/home/add-paciente">Crear Paciente</Link></Menu.Item>
                <Menu.Item>Listar Pacientes</Menu.Item>
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
            </Menu>
         </Sider>
         <Layout className="layout">
           <Case>
                <ProtectedRoutes exact path="/home" component={Home}/>
                <ProtectedRoutes exact path="/home/add-paciente" component={AddPacienteView}/>
                <ProtectedRoutes exact path="/home/listpaciente" component={ListPaciente} />
                <Route path="/home/*">
                    <h1>404</h1>
                </Route>
           </Case>
          <Footer style={{ textAlign: 'center' }}>Bonifacio Juarez Ceja ©</Footer>
         </Layout>
        </Layout>

    );
    
}

export default Nav
