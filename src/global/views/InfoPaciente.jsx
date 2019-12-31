import React from 'react';
import {Layout} from 'antd';
import {useParams} from 'react-router-dom'
import Head2 from '../components/Head2';
import CardPaciente2 from '../components/card/CardPaciente2';
import { DELETE_EXPEDIENT } from '../Querys/Query';
import { useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2'

const {Header,Content} = Layout

function InfoPaciente(props){
    const {id} = useParams() 
    var url = ()=>{
        props.history.push(`/home/expedient-paciente/${id}`)
    }
    var crear=()=>{
        props.history.push(`/home/create-familiar/${id}`)
    }
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }
    const [dele] = useMutation(DELETE_EXPEDIENT,{
        onCompleted(data){
            Swal.fire({
                title:"Exito",
                text:"Se a eliminado el Expediente con Exito",
                icon:"success",
                
            }).then((result)=>{
                if(result.value){
                    window.location.reload()
                }
            })
        },
        onError(err){
            Swal.fire({
                title:"Error",
                text:"Hubo un error al Eliminar la nota",
                icon:"error"
            })
        }
    })
    return(
        <div>
            <Header  style={{ background: '#fff', padding: 0 }} >
                <Head2 subtitle="Informacion Paciente" function={logout} />
            </Header>
            <Content style={{ margin: '24px 16px 0' }} >
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }} >
                    <CardPaciente2 id={id} mutation={dele} crear={crear} function={url} />
                    
                </div>
            </Content>
        </div>
    )
}

export default InfoPaciente