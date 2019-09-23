import React,{Component} from 'react';
import {Switch} from 'antd';

function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

 export default  class Switc extends Component{
    render(){
        return (
            <div>
                <Switch key="more" size="small" defaultChecked onChange={onChange}></Switch>
            </div>
        );
    }
}

