import React from 'react'
import {Layout} from 'antd';
import Head2 from './../components/Head2';
import {useParams} from 'react-router-dom'
import CardMedicine from '../components/card/CardMedicine';
const {Header,Content} = Layout
const MedicinView = (props)=>{
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }
    const {id} = useParams()
    return(
        <div>
        <Header className="header" style={{ background: '#fff', padding: 0 }}> 
            <Head2 subtitle="Medicina" function={logout} />
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
               <CardMedicine id={id} />
            </div>
        </Content>
    </div>
    )
}
export default MedicinView