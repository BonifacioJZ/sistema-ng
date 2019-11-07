import React from 'react';
import {Layout} from 'antd';
import Head2 from './../components/Head2';
import ListP from './../components/List/ListP'
const {Header,Content} = Layout;
function ListPaciente(props){
    
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }
    return(
        <div>
            <Header className="header" style={{ background: '#fff', padding: 0 }}> 
                <Head2 subtitle="Lista de pacientes" function={logout} />
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <ListP/>
                </div>
            </Content>
        </div>
    )
}

export default ListPaciente