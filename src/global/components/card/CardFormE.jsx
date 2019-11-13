import React from 'react';
import {Card} from 'antd'
import AddExpediente from './../Forms/AddExpediente';

function CardFormE (props){
    return(
        <Card title="Expediente">
            <AddExpediente/>
        </Card>
    )
}

export default CardFormE