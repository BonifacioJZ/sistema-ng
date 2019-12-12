import React from 'react'
import {Layout} from 'antd';
import Head2 from './../components/Head2';
import ListM from '../components/List/ListM';

const {Header,Content} = Layout;
const Medicineslist = ({props,id})=>{
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }
    return (
        <div>
            <Header className="header" style={{ background: '#fff', padding: 0 }}> 
                <Head2 subtitle="Lista de Medicinas" function={logout} />
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <ListM />
                </div>
            </Content>
        </div>
    )
}

export default Medicineslist