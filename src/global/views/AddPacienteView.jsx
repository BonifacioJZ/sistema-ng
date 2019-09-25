import React,{Component} from 'react';
import {Layout} from 'antd';
import Head from './../components/Head';
import AddPaciente from './../components/Forms/AddPaciente';
const {Header,Content} = Layout;

class AddPacienteView extends Component{
    render(){
        return(
            <div>
                <Header id="aPaciente" style={{ background: '#fff', padding: 0 }} >
                    <Head name="Sitema NG" />
                </Header>
                <Content  style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <AddPaciente/>
                    </div>
                </Content>
            </div>
        );
    };
};

export default AddPacienteView