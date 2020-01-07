import React,{Component} from 'react';
import { Layout,Row,Col } from 'antd';
import Head from './../components/Head';
import Option from './../components/Option';
import {addPaciente, pacientes, medicina, expdientes} from '../variables/informacion';
import Option2 from '../components/Option2';
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
                        <Option2 img="static/img/hospital-840135__340.jpg" alt="Paciente" ruta="add-paciente" description={addPaciente} title="Paciente"/>
                    </Col>
                    <Col lg={{span:8}} md={{span:12}} xs={{span:24}}>
                        <Option2  img="static/img/hospice-1821429_1920.jpg" ruta="listpaciente" alt="Pacientes" title="Pacientes" description={pacientes} />
                    </Col>
                    <Col lg={{span:8}} md={{span:12}} xs={{span:24}}>
                        <Option  img="static/img/23.jpg" alt="Medicina" ruta="medicine" ruta2="medicines" title="Medicinas" description={medicina}  />
                    </Col>
                    <Col lg={{span:8}} md={{span:12}} xs={{span:24}}>
                        <Option img="static/img/checklist-3222079_1920.jpg" ruta="expedients" alt="Expedientes" title="Expedientes" description={expdientes} />
                    </Col>
                </Row>
              </div>
            </Content>
        </div>
         
    );
    
    }
}

export default Home
