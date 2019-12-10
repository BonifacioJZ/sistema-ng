import React from 'react';
import {Form} from 'antd'


class AddMedicine extends React.Component{
    render(){
        return(
            <div>Crear Medicina</div>
        )
    }
}

export default AddMedicine = Form.create({name:'register'})(AddMedicine);