import React from 'react'

import {Layout} from 'antd';
import Head2 from './../components/Head2';
import LispE from '../components/List/LispE';
import { SEARCH_EXPEDIENT } from '../Querys/Query';
import { useLazyQuery } from '@apollo/react-hooks';

const {Header,Content} = Layout;

const ViewEps = (props)=>{
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }
    const [search,{data}] = useLazyQuery(SEARCH_EXPEDIENT)
    
    return (
        <div>
        <Header className="header" style={{ background: '#fff', padding: 0 }}> 
            <Head2 subtitle="Expedientes" function={logout} />
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
               <LispE query={search} data={data} />
            </div>
        </Content>
    </div>
    )
}
export default ViewEps