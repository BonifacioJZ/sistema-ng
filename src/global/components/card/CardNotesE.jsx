import React from 'react'
import { List,Card, Row, Col, Button, Icon } from 'antd';
import {Link} from 'react-router-dom'
import { url } from '../../variables/os';
import  reqwest from 'reqwest'
import IconText from '../simplecomponents/IconText';
import Swal from 'sweetalert2'

const token = localStorage.getItem('token')
class CardNotesE extends React.Component{

   constructor(props){
        super(props)
        this.delete = this.delete.bind(this)
        this.state = {
            data:[],
            loading:true,
            ok:false
        }
   }
    
    componentDidMount(){
        this.fetchData(res=>{
            this.setState({
                data:res.data.expedient.notesexpedientSet,
                loading:false,
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
    
    delete =(id)=>{
        
        if(id){
            Swal.fire({
                title:"Estas Seguro de Eliminar esta Nota",
                text: "Esta decicion no es Reversible",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#52c41a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si eliminar'
            }).then((result)=>{
                result.value?this.props.mutation({variables:{id:id}}):console.log("No Funciona")
            })
        }
    }
    render(){
        
    return(
        <div>
            
            <Card title="Notas" >
                <List
                    loading={this.state.loading}
                    dataSource={this.state.data}
                    size="large"
                        pagination={{
                            onChange: page => {
                               
                            },
                            pageSize: 10,
                        }}
                    renderItem={item=>(
                            <List.Item
                                key={item.id}
                                actions ={
                                    [
                                        <IconText  direccion="/home/note-expedient" id={item.id} type="profile" color="#52c41a" theme="twoTone" />,
                                        <IconText  direccion="/home/note-expedient-edit" type="edit" theme="twoTone"  color="#52c41a" id={item.id}/>,
                                        <Button onClick={this.delete.bind(this,item.id)}><Icon type="delete" theme="twoTone" twoToneColor="#ff4d4f" /></Button>

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