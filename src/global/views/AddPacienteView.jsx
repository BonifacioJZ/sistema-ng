import React from 'react';
import {Layout,Row,Col} from 'antd';
import Head2 from '../components/Head2'
import AddPaciente from './../components/Forms/AddPaciente';
import swal from 'sweetalert';
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
                console.log(data)
                swal({
                    title:"Exito",
                    text:"El Paciente fue creado con exito",
                    icon:"success"
                })
            },
            onError(err){
                console.error(err)
                swal({
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