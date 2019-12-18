import React from 'react'
import { url } from '../../variables/os';
import reqwest from 'reqwest'
import { List, Icon,Button } from 'antd';
import IconText from '../simplecomponents/IconText';
import Swal from 'sweetalert2'

const token = localStorage.getItem('token')
class ListM extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            data:[],
            loading:true
        }
        this.delete = this.delete.bind(this)

    }
    componentDidMount(){
        this.fetchData(res=>{
            this.setState({
                data:res.data.medicines,
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
                    medicines{
                        id,
                        nombre,
                        formula   
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
    delete=(id)=>{
        if(id){
            Swal.fire({
                title:"Estas Seguro de Eliminar el Expediente",
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
               <List 
                   loading={this.state.loading}
                   dataSource={this.state.data}
                   size="large"
                        pagination={{
                            onChange: page => {
                               
                            },
                            pageSize: 5,
                        }}
                   renderItem={item=>(
                       <List.Item
                            key={item.id}
                            actions={[
                                <IconText direccion="/home/medicines-update" id={item.id}   type="edit" theme="twoTone"  color="#52c41a" />,
                                <IconText direccion="/home/medidine-info" id={item.id} type="profile" color="#52c41a"  theme="twoTone"  />,
                                <Button onClick={this.delete.bind(this,item.id)} ><Icon type="delete" theme="twoTone" twoToneColor="#ff4d4f" /></Button>
                            ]}>
                            <List.Item.Meta
                                title={`${item.nombre.toUpperCase()}`}
                                description={
                                    `Formula ${item.formula}`
                                }
                            />

                       </List.Item>
                   )}
               />
           </div>
        )
    }
}

export default ListM