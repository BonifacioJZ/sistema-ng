import React from 'react'
import { List,Card, Row, Col, Button } from 'antd';
import {Link} from 'react-router-dom'
import { url } from '../../variables/os';
import  reqwest from 'reqwest'
import IconText from '../simplecomponents/IconText';

const token = localStorage.getItem('token')
class CardNotesE extends React.Component{

    state = {
        data:[],
        loading:true
    }
    
    componentDidMount(){
        this.fetchData(res=>{
            this.setState({
                data:res.data.expedient.notesexpedientSet,
                loading:false
            })
            

        })
    }

    fetchData= callback=>{
        reqwest({
            url,
            method:'post',
            type:"json",
            data:{
                query:`
                query{
                    expedient(id:${this.props.id}){
                        notesexpedientSet{
                            id,
                            titulo,
                            fecha
                          }
                    }
                }`
            },
            headers:{
                Authorization:`JWT ${token}`
            },
            success: res => {
                callback(res);
              },

        })
    }
  
    render(){
    return(
        <div>
            
            <Card title="Notas" >
                <List
                    loading={this.state.loading}
                    dataSource={this.state.data}
                    renderItem={item=>(
                            <List.Item
                                key={item.id}
                                actions ={
                                    [
                                        <IconText  direccion="/home/info-expedient"  id={item.id} type="profile" color="#52c41a" theme="twoTone" />,
                                        <IconText  type="edit" theme="twoTone"  color="#52c41a" id={item.id}/>,

                                    ]
                                }>
                                <List.Item.Meta
                                    title={item.titulo}
                                />
                            </List.Item>
                        )}></List>
            </Card>
            <br/>
            <Row justify="center" >
                <Col offset={10} >
                    <Link to={`/home/create-note-expedient/${this.props.id}`}>
                        <Button>Crear Nota</Button>
                    </Link>
                </Col>
            </Row>
        </div>

    )
    }
}

export default CardNotesE