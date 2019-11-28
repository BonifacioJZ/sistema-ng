import React from 'react';
import {Layout} from 'antd';
import {useParams} from 'react-router-dom'
import Head2 from '../components/Head2';
import CardPaciente2 from '../components/card/CardPaciente2';


const {Header,Content} = Layout

function InfoPaciente(props){
    const {id} = useParams() 
    var url = ()=>{
        props.history.push(`/home/expedient-paciente/${id}`)
    }
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }
    return(
        <div>
            <Header  style={{ background: '#fff', padding: 0 }} >
                <Head2 subtitle="Informacion Paciente" function={logout} />
            </Header>
            <Content style={{ margin: '24px 16px 0' }} >
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }} >
                    <CardPaciente2 id={id} function={url} />
                    
                </div>
            </Content>
        </div>
    )
}

export default InfoPaciente