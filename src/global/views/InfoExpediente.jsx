import React from 'react';
import {Layout} from 'antd';
import {useParams} from 'react-router-dom'
import Head2 from '../components/Head2';
import CardExp from '../components/card/CardExp';

const {Header,Content} = Layout


function InfoExpediente (props){
    const {id} = useParams()
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }
    return (
            <div>  
                <Header  style={{ background: '#fff', padding: 0 }} >
                    <Head2 subtitle="Informacion Expediente" function={logout} />
                </Header>
                <Content style={{ margin: '24px 16px 0' }} >
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }} >
                        <CardExp id={id} /> 
                    </div>
                </Content>
            </div>
    )
}

export default InfoExpediente
