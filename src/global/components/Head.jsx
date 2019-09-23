import React from 'react';
import {PageHeader , Button} from 'antd';

export default function Head(props){
    return(
        <PageHeader  
        title={props.name} 
        subTitle={props.subname}
        extra={[
            <Button key="1" type="ghost">Log out</Button>,
             
            
        ]}
           
        />
    );
}
