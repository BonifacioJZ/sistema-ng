import React from 'react';
import {Layout,Row,Col} from 'antd';
import Head2 from '../components/Head2'
import AddPaciente from './../components/Forms/AddPaciente';
const {Header,Content} = Layout;

function AddPacienteView (props){  
        var logout = ()=>{
            localStorage.clear()
            props.history.push("/")
        }
        return(
            <div>
                <Header id="aPaciente" style={{ background: '#fff', padding: 0 }} >
                    <Head2 subtitle="Crear Paciente" function={logout} />
                </Header>
                <Content  style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Row>
                        <Col span={19}><AddPaciente/></Col>
                    </Row>
                </div>
                </Content>
            </div>
        );
};

export default AddPacienteView