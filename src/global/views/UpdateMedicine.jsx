import React from 'react'
import {Layout,Row,Col} from 'antd'
import {useParams} from 'react-router-dom';
import Head2 from '../components/Head2';
import Swal from 'sweetalert2'
import UpdateMedicineForm from '../components/Forms/UpdateMedicineForm';
import { UPDATE_MEDICINE } from '../Querys/Query';
import { useMutation } from '@apollo/react-hooks';

//Constantes 
const {Header,Content} = Layout
const UpdateMedicine = (props)=>{
    const {id} = useParams()
    const [update] = useMutation(UPDATE_MEDICINE,{
        onCompleted(data){
            Swal.fire({
                title:"Exito",
                text:"Se a Actualizado la medicina Exitosamente",
                icon:"success"
            }).then((result)=>{
              if(result.value){
                  props.history.push(`/home/medicines`)
              }
            })
        },
        onError(data){
            console.log(data)
        }
    })
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }

    return(
        <div>
            <Header style={{ background: '#fff', padding: 0 }} >
                <Head2 subtitle="Actualizar Medicina" function={logout} />
            </Header>
            <Content style={{ margin: '24px 16px 0' }} >
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }} >
                    <Row>
                        <Col span={19} > 
                            <UpdateMedicineForm mutation={update} id={id}  />
                        </Col>
                    </Row>
                </div>
            </Content>
        </div>
    )
}

export default UpdateMedicine