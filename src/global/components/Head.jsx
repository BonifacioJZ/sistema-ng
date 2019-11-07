import React from 'react';
import {PageHeader , Button} from 'antd';

export default function Head(props){
    return(
        <PageHeader  
        className="header"
        title={props.name} 
        extra={[
            <Button key="1" type="ghost" icon="logout" size="small" onClick={props.function}>Salir</Button>,
             
        ]}
           
        />
    );
}
