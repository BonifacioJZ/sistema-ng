import React,{Component} from 'react'
import { Input } from 'antd';

class Number extends Component {
    static getDerivedStateFromProps(nextProps) {
        if('value' in nextProps){
            return{
                ...(nextProps||{}),
            }
        }
        return null       
    }
    constructor(props){
        super(props);
        const value = props.value || {};
        this.state={
            number:value.number ||0,
        }
    }
    handleNumberChange = e=>{
        const number = parseInt(e.target.value||0,10);
        if(isNaN(number)){
            return;
        }
        if(!('value'in this.props)){
            this.setState({number})
        }
        this.triggerChange({number})
    }
    triggerChange = changedValue=>{
        const {onChange} = this.props;
        if(onChange){
            onChange({
                ...this.state,
                ...changedValue,
            });
        }
    }
    render(){
        const {size} = this.props;
        const {number} = this.state;
        return(
            <Input
                type="text"
                size={size}
                value={number}
                onchange={this.handleNumberChange}
                style={{ width: '65%', marginRight: '3%' }}
            />
        )
    }
}
export default Number