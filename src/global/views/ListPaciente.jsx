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
            <Header className="head" style={{ background: '#fff', padding: 0 }}> 
                <Head2 subtitle="Lista de pacientes" function={logout} />
            </Header>
            <Content>
                <ListP />
            </Content>
        </div>
    )
}

export default ListPaciente