import React from 'react'
import { url } from '../../variables/os';
import reqwest  from 'reqwest'
import { List } from 'antd';
import IconText from '../simplecomponents/IconText';

const token = localStorage.getItem('token')
class LispE extends React.Component{

    constructor(props){
        super(props)
        this.state={
            datos:[],
            loading:true
        }
    }

    componentDidMount(){
        this.fetchData(res=>{
            this.setState({
                datos:res.data.expedients,
                loading:false
            })
        })
    }
    fetchData = cb=>{
        reqwest({
            url,
            method:'post',
            type:"json",
            data:{
                query:`
                query{
                    expedients{
                        id,
                        hoara,
                        date,
                        
                      }
                }`
            },
            headers:{
                Authorization:`JWT ${token}`
            },
            success: res => {
                cb(res);
              },

        })
        
    }
    render(){
        return(
            <div>
                <List 
                    loading={this.state.loading}
                    dataSource={this.state.datos}
                    pagination={{
                    onChange:page=>{
                        
                    },
                    pageSize:10,
                   
                    }}
                    renderItem ={item=>(
                        <div>
                            <List.Item
                                key={item.id}
                                actions={[
                                    <IconText  direccion="/home/info-expedient"  id={item.id} type="profile" color="#52c41a" theme="twoTone" />,
                                        <IconText direccion="/home/edit-expedient" id={item.id} type="edit" theme="twoTone"  color="#52c41a" />,
                                        
                                ]}>
                                    <List.Item.Meta
                                    title={item.date}
                                    />
                            </List.Item>
                        </div>
                    )}
                />
            </div>
        )
    }
}

export default LispE