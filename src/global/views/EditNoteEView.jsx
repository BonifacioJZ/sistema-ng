import React from 'react'
import {useParams} from 'react-router-dom'
import {Layout,Col,Row} from 'antd'
import Head2 from '../components/Head2';
import UpdateNoteEForm from '../components/Forms/UpdateNoteEForm';
import { UPDATE_NOTE_EXPEDIENT } from '../Querys/Query';
import { useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2'

const {Header,Content} = Layout

export default function EditNoteEView(props){
    const {id} = useParams()
    const [note] = useMutation(UPDATE_NOTE_EXPEDIENT,{
        onCompleted(data){
            Swal.fire({
                title:"Exito",
                text:"Se a Actualizado la Nota Exitosamente",
                icon:"success"
            }).then((result)=>{
              if(result.value){
                  props.history.push(`/home/note-expedient/${id}`)
              }
            })
        },
        onError(error){
            Swal.fire({
                title:"Error",
                text:"Ocurrio un error al Actualizar los datos Por Favor Revise los datos o Compruebe su Conexion",
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
        <Header id="aPaciente" style={{ background: '#fff', padding: 0 }} >
               <Head2 subtitle="Notas" function={logout} />
        </Header>
        <Content  style={{ margin: '24px 16px 0' }}>
           <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
               <Row>
                   <Col>
                      <UpdateNoteEForm mutation={note} id={id} />
                   </Col>
               </Row>
           </div>
           </Content>
   </div>
    )
}