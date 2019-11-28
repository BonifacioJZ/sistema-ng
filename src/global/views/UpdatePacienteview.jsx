//Imports 
import React from 'react'
import {Layout,Row,Col} from 'antd'
import {useParams} from 'react-router-dom';
import Head2 from '../components/Head2';
import UpdatePaciente from '../components/Forms/UpdatePacient';
import Swal from 'sweetalert2'
import { UPDATE_PATIENT } from '../Querys/Query';
import { useMutation } from '@apollo/react-hooks';

//Constantes 
const {Header,Content} = Layout 

function UpdatePacienteView(props){
    const {id} = useParams()
    const [patient] = useMutation(UPDATE_PATIENT,{
        onCompleted(data){
          Swal.fire({
              title:"Exito",
              text:"Se a Actualizado el paciente Exitosamente",
              icon:"success"
          }).then((result)=>{
            if(result.value){
                props.history.push(`/home/info-paciente/${id}`)
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
    var logout = ()=>{
            localStorage.clear()
            props.history.push("/")
        }

    return(
        <div>
            <Header style={{ background: '#fff', padding: 0 }} >
                <Head2 subtitle="Actualizar Paciente" function={logout} />
            </Header>
            <Content style={{ margin: '24px 16px 0' }} >
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }} >
                    <Row>
                        <Col span={19} > <UpdatePaciente mutation={patient} id ={id} /> </Col>
                    </Row>
                </div>
            </Content>
        </div>
    )
}

export default UpdatePacienteView
