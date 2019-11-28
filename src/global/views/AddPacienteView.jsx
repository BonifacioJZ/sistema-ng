import React from 'react';
import {Layout,Row,Col} from 'antd';
import Head2 from '../components/Head2'
import AddPaciente from './../components/Forms/AddPaciente';
import Swal from 'sweetalert2';
import {useMutation} from '@apollo/react-hooks';
import {ADD_PACIENTE} from './../Querys/Query'
const {Header,Content} = Layout;

function AddPacienteView (props){  
        var logout = ()=>{
            localStorage.clear()
            props.history.push("/")
        }
        const [paciente] = useMutation(ADD_PACIENTE,{
            onCompleted(data){
                const id = data.createPaciente.pacienteUser.id
                Swal.fire({
                    title:"Exito",
                    text:"El Paciente fue creado con exito",
                    icon:"success",
                    
                }).then((result)=>{
                    if(result.value){
                        props.history.push(`/home/info-paciente/${id}`)
                    }
                })
            },
            onError(err){
                console.error(err)
                Swal.fire({
                    title:"Error",
                    text:"Hubo un error al insertar el Paciente",
                    icon:"error"
                })
            }
        })
        return(
            <div>
                <Header id="aPaciente" style={{ background: '#fff', padding: 0 }} >
                    <Head2 subtitle="Crear Paciente" function={logout} />
                </Header>
                <Content  style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Row>
                        <Col span={19}><AddPaciente mutation={paciente}/></Col>
                    </Row>
                </div>
                </Content>
            </div>
        );
};

export default AddPacienteView