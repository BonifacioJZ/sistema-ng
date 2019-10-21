import React,{Component} from 'react';
import { Layout,Row,Col } from 'antd';
import Head from './../components/Head';
import Option from './../components/Option';
import {addPaciente} from '../variables/informacion';
const { Header, Content, } = Layout;


class Home extends Component {
 
  render(){
    var logout = ()=>{
        localStorage.clear()
        this.props.history.push("/")
    }

    
      return (
          <div>
            <Header  id="head" style={{ background: '#fff', padding: 0 }}>
              <Head name="Sistema NG" function={logout} />
            </Header>
            <Content style={{ margin: '24px 16px 0' }} >
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Row type="flex" gutter={16}>
                    <Col lg={{span:8}} md={{span:12}} xs={{span:24}}>
                        <Option img="/img/hospital-840135__340.jpg" alt="Paciente" ruta="add-paciente" description={addPaciente} title="Paciente"/>
                    </Col>
                    <Col lg={{span:8}} md={{span:12}} xs={{span:24}}>
                        <Option  img="/img/hospice-1821429_1920.jpg" alt="Pacientes" title="Pacientes" />
                    </Col>
                    <Col lg={{span:8}} md={{span:12}} xs={{span:24}}>
                        <Option  img="/img/isolated-1188036_1920.png" alt="Medicos" title="Medicos"/>
                    </Col>
                    <Col lg={{span:8}} md={{span:12}} xs={{span:24}}>
                        <Option img="/img/nurse-748186_1920.jpg" alt="Enfermeras"  title="Enfermeras"/>
                    </Col>
                    <Col lg={{span:8}} md={{span:12}} xs={{span:24}}>
                        <Option img="/img/checklist-3222079_1920.jpg" alt="Expedientes" title="Expedientes" />
                    </Col>
                </Row>
              </div>
            </Content>
        </div>
         
    );
    
    }
}

export default Home
