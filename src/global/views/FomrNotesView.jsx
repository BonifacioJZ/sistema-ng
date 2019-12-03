import React from 'react'
import { Layout,Row,Col } from 'antd';
import {useParams} from 'react-router-dom'
import Head2 from '../components/Head2';
import FormNoteE from '../components/Forms/FormNoteE';
import { ADD_NOTEE } from '../Querys/Query';
import { useMutation } from '@apollo/react-hooks';


const {Header,Content}  = Layout

function FormNotesView(props){
    const {id} = useParams()
    const [notes] = useMutation(ADD_NOTEE,
        {
            onCompleted(data){
                console.log(data)
            },
            onError(err){
                console.error(err)
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