import React from 'react'
import { Layout,Row,Col } from 'antd';
import {useParams} from 'react-router-dom'
import Head2 from '../components/Head2';
import FormNoteE from '../components/Forms/FormNoteE';
import { ADD_NOTEE } from '../Querys/Query';
import { useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2'

const {Header,Content}  = Layout

function FormNotesView(props){
    const {id} = useParams()
    const [notes] = useMutation(ADD_NOTEE,
        {
            onCompleted(data){
                Swal.fire({
                    title:"Exito",
                    text:"Se a Creado la Nota Exitosa mente",
                    icon:"success"
                }).then((result)=>{
                  if(result.value){
                      props.history.push(`/home/notes-expedient/${id}`)
                  }
                })
            },
            onError(err){
                Swal.fire({
                    title:"Error",
                    text:"Ocurrio un error al Crear los datos Por Favor Revise los datos o Compruebe su Conexion",
                    icon:"warning"
                })
            }
        })
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }

    return(
        <div>
            <div>
             <Header id="aPaciente" style={{ background: '#fff', padding: 0 }} >
                    <Head2 subtitle="Crear Nota" function={logout} />
             </Header>
             <Content  style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Row>
                        <Col>
                            <FormNoteE mutation={notes} id={id} />
                        </Col>
                    </Row>
                </div>
                </Content>
        </div>

        </div>
    )
}

export default FormNotesView