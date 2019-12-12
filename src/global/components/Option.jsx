import React ,{Component}from 'react';
import {Card,Icon,Modal} from 'antd';
import {Link} from 'react-router-dom';
const {Meta} = Card
class Option extends Component{
    state = {
        visible:false,
        url:`/home/${this.props.ruta}`,
        url2:`/home/${this.props.ruta2}`
    };
    showModal = ()=>{
        this.setState({
            visible:true
        });
    };
    handlerOk = e =>{
        
        this.setState({
            visible:false
        })
    }
    
    handlerCancel= e =>{
       
        this.setState({
                visible:false,
               
        });
    };
   
    render(){
        return(
        <div>
            <Card
                cover={
                    <img 
                        alt={this.props.alt}
                        src={this.props.img}
                    />
                }
                actions={[
                    <Link to={this.state.url}><Icon type="user-add"   key="setting"/></Link>,
                    <Link to={this.state.url2}><Icon type="edit" key="edit"/></Link>,
                    <Icon type="info-circle" onClick={this.showModal} key="ellipsis"/>
                ]}>
                <Meta
                    title={this.props.title}
                   
                />
            </Card>
            <Modal
                title={this.props.title}
                visible={this.state.visible}
                
                onOk={this.handlerOk}
                onCancel={this.handlerCancel}>
                <p>{this.props.description}</p>
            </Modal>
        </div>
        );
    };
};

export default Option;