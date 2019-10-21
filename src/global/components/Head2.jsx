import React from 'react';
import {PageHeader,Button} from 'antd';

export default function Head2 (props){
    return (
       <PageHeader 
           className="Header"
           title="Sistema NG"
           subTitle={props.subtitle}
           onBack ={()=>{
               window.history.back()
           }}
           extra={[
            <Button key="1" type="ghost" icon="logout" size="small" onClick={props.function}>Log out</Button>,   
        ]}
       />
    )
}