import React from 'react'
import {Layout} from 'antd';
import Head2 from '../components/Head2';
import {useParams} from 'react-router-dom'

const {Header,Content} = Layout

const Familiar =(props)=>{
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }
    return(
        <div>
            <Header  style={{ background: '#fff', padding: 0 }} >
                <Head2 subtitle="Familiar" function={logout} />
            </Header>
            <Content style={{ margin: '24px 16px 0' }} >
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }} >
                    
                    
                </div>
            </Content>
        </div>
    )
}
export default Familiar