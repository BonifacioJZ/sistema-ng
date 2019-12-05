import React from 'react'
import {Layout,Row,Col} from 'antd'
import {useParams} from 'react-router-dom'
import Head2 from '../components/Head2';
import UpdateExpedient from '../components/Forms/UpdateExpedient';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_EXPEDIENTE } from '../Querys/Query';
import Swal from 'sweetalert2'

const {Header,Content} = Layout
function EditExpedient(props){
    const  {id} = useParams()
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }
    const [expedient] = useMutation(UPDATE_EXPEDIENTE,{
        onCompleted(data){
            Swal.fire({
                title:"Exito",
                text:"Se a Actualizado el Expediente Exitosamente",
                icon:"success"
            }).then((result)=>{
              if(result.value){
                  props.history.push(`/home/info-expedient/${id}`)
              }
            })
        },
        onError(err){
            Swal.fire({
                title:"Error",
                text:"Ocurrio un error al Actualizar los datos Por Favor Revise los datos o Compruebe su Conexion",
                icon:"warning"
            })
        
        }
    })

    return(
        <div>
                <Header id="aPaciente" style={{ background: '#fff', padding: 0 }} >
                    <Head2 subtitle="Actualizar Expediente" function={logout} />
                </Header>
                <Content  style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Row>
                        <Col span={19}>
                            <UpdateExpedient mutation={expedient} id ={id}/>
                        </Col>
                    </Row>
                </div>
                </Content>
            </div>
    )
}
export default EditExpedient;