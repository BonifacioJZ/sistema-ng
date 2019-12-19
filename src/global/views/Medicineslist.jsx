import React from 'react'
import {Layout} from 'antd';
import Head2 from './../components/Head2';
import ListM from '../components/List/ListM';
import { DELETE_MEDICINE, SEARCH_MEDICINE } from '../Querys/Query';
import { useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2'
import { useLazyQuery } from '@apollo/react-hooks';
const {Header,Content} = Layout;
const Medicineslist = (props)=>{
    var logout = ()=>{
        localStorage.clear()
        props.history.push("/")
    }
    const [medicin,{data}] =useLazyQuery(SEARCH_MEDICINE) 
    const [delet] = useMutation(DELETE_MEDICINE,{
        onCompleted(){
            Swal.fire({
                title:"Exito",
                text:"Se a eliminado la Medicina con Exito",
                icon:"success",
                
            }).then((result)=>{
                if(result.value){
                    window.location.reload()
                }
            })
        }, onError(){
            Swal.fire({
                title:"Error",
                text:"Hubo un error al Eliminar la Medicina",
                icon:"error"
            })
        }
    })
    return (
        <div>
            <Header className="header" style={{ background: '#fff', padding: 0 }}> 
                <Head2 subtitle="Lista de Medicinas" function={logout} />
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <ListM mutation={delet} query={medicin} data={data}/>
                </div>
            </Content>
        </div>
    )
}

export default Medicineslist