import React from 'react';
import {useParams} from 'react-router-dom'
import { Layout,Col,Row } from 'antd';
import Head2 from '../components/Head2';
import CardNotesE from '../components/card/CardNotesE';


const {Header,Content} =Layout

function NotasE(props){
    const {id} = useParams()
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }
    return (
        <div>
             <Header id="aPaciente" style={{ background: '#fff', padding: 0 }} >
                    <Head2 subtitle="Notas" function={logout} />
             </Header>
             <Content  style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Row>
                        <Col>
                            <CardNotesE id={id}></CardNotesE>
                        </Col>
                    </Row>
                </div>
                </Content>
        </div>
        
    )

}

export default NotasE 