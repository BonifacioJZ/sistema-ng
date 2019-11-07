import React from 'react';
import { Layout, Menu,  Icon } from 'antd';
import Home from './Home';
import {Switch as Case,Route,Link} from 'react-router-dom';
import {ProtectedRoutes} from '../routes/ProtectedRoutes';
import AddPacienteView from './AddPacienteView';
import ListPaciente from './ListPaciente';
import ExpedientePaciente  from './ExpedientePaciente';
import Error404 from './Error404';

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
            
          }}
          onCollapse={(collapse,type)=>{
            
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
                <Menu.Item><Link to="/home/listpaciente" >Listar Pacientes</Link></Menu.Item>
              </SubMenu>
              <SubMenu
                key="2"
                title={
                  <span>
                    <Icon type="profile" />
                    <span className="nav-text">Expedientes</span>
                  </span>
                }>
                <Menu.Item>
                 <Link to="/home/expedient-paciente">Crear Expediente</Link>
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
                <ProtectedRoutes exact path="/home/expedient-paciente/:id" component={ExpedientePaciente} />
                <Route path="/home/*" component={Error404} />
           </Case>
          <Footer style={{ textAlign: 'center' }}>Bonifacio Juarez Ceja ©</Footer>
         </Layout>
        </Layout>

    );
    
}

export default Nav
