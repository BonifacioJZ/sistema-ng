import React from 'react';
import {useParams} from 'react-router-dom'
import { Layout,Col,Row } from 'antd';
import Head2 from '../components/Head2';
import CardNotesE from '../components/card/CardNotesE';
import { DELETE_NOTE_EXPEDIENT } from '../Querys/Query';
import { useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2'

const {Header,Content} =Layout

function NotasE(props){
    const {id} = useParams()
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }
    const [noted] = useMutation(DELETE_NOTE_EXPEDIENT,{
        onCompleted(data){
            Swal.fire({
                title:"Exito",
                text:"Se a eliminado la nota con Exito",
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
    return (
        <div>
             <Header id="aPaciente" style={{ background: '#fff', padding: 0 }} >
                    <Head2 subtitle="Notas" function={logout} />
             </Header>
             <Content  style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Row>
                        <Col>
                            <CardNotesE mutation={noted} id={id}></CardNotesE>
                        </Col>
                    </Row>
                </div>
                </Content>
        </div>
        
    )

}

export default NotasE 