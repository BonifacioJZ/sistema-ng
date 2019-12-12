import React from 'react'

import {Layout} from 'antd';
import Head2 from './../components/Head2';
import AddMedicine from '../components/Forms/AddMedicine';
import { ADD_MEDICINE } from '../Querys/Query';
import { useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2';

const {Header,Content} = Layout;

const MedicineView = (props)=>{
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }
    const [medicine] = useMutation(ADD_MEDICINE,{
        onCompleted(data){
            Swal.fire({
                title:"Exito",
                text:"El medicamento se a creado exitosamente",
                icon:"success"
            }).then((result)=>{
              if(result.value){
                  props.history.push(`/home/medicines`)
              }
            })
        },
        onError(){
            Swal.fire({
                title:"Error",
                text:"Ocurrio un error al incertar el medicamento por favor intente mas tarde",
                icon:"error"
            })
        }
    })
    return(
        <div>
            <Header className="header" style={{ background: '#fff', padding: 0 }}> 
                <Head2 subtitle="Medicinas" function={logout} />
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <AddMedicine mutation={medicine} />
                </div>
            </Content>
        </div>
    )
}

export default MedicineView