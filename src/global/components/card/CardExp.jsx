import React,{Component} from 'react';
import { url } from '../../variables/os';
import { List } from 'antd';
import reqwest from 'reqwest'

const token = localStorage.getItem('token')
class CardExp extends Component{
    
    state={
        da:[],
        load:true
    }

    fetchData = callback =>{
        reqwest({
            url,
            method:'post',
            type:"json",
            data:{
                query:`
                query{
                    expedientp(idpaciente:${1}){
                        id
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
    componentDidMount(){
       
        this.fetchData(res=>{
            console.log(res.data.expedientp)
            this.setState({
                da:res.data.expedientp,
                loading:false
            })
        })
       
        
    }


    render(){
        return(
            <div> <List 
            itemLayout="horizontal"
            loading={this.state.loading}
            dataSource={this.state.da}
            renderItem={item=>(
                <div></div>
            )}
           
            
        /></div>
        )
    }

}

export default CardExp