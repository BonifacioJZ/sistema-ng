import React from 'react';
import {Card} from 'antd'
import AddExpediente from './../Forms/AddExpediente';
import { CREAT_EXPEDIENTE } from '../../Querys/Query';
import { useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2';

function CardFormE ({id}){
    const [expedient] = useMutation(CREAT_EXPEDIENTE,{
        onCompleted(date){
            Swal.fire(
                {
                    title:"Exito",
                    icon:"success",
                    text:"Se Creo el Expediente con Exito"
                }
            )
        },
        onError(err){
            console.error(err)
        }
    })
    return(
        <Card title="Expediente">
            <AddExpediente  id={id} mutation={expedient} />
        </Card>
    )
}

export default CardFormE