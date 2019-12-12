import React from 'react'
import { url } from '../../variables/os';
import reqwest from 'reqwest'
import { List } from 'antd';
import IconText from '../simplecomponents/IconText';

const token = localStorage.getItem('token')
class ListM extends React.Component{
    state ={
        data:[],
        loading:true
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
                                <IconText type="edit" theme="twoTone"  color="#52c41a" />,
                                <IconText type="file-add" color="#52c41a" theme="twoTone" />,
                                <IconText type="profile" color="#52c41a"  theme="twoTone"  />
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