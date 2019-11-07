import React from 'react';
import {Layout} from 'antd';
import {useParams} from 'react-router-dom';
import Head2 from './../components/Head2'
const {Header,Content} = Layout;

function ExpedientePaciente (props){
    const {id} = useParams()    
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }
        return(
            <div>
                <Header className="header" style={{ background: '#fff', padding: 0 }}>
                    <Head2 subtitle="Paciente" function={logout} />
                </Header>
                <Content  style={{ margin: '24px 16px 0' }} >
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <h1>{id}</h1>
                    </div>
                </Content>
            </div>
        )
    
}

export default ExpedientePaciente
