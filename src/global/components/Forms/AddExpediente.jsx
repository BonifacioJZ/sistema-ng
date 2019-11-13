import React from 'react';
import {Form,Input,Col,Row,Button} from 'antd'

class AddExpediente extends React.Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form  layout="horizontal" onSubmit={this.handleSubmit} >
                <Row gutter={24} >
                    <Col span={8}>
                        <Form.Item label="Peso">
                            {getFieldDecorator('peso',{
                                rules:[]
                            })(<Input  placeholder="peso" />)}
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <Form.Item label="Altura">
                            {getFieldDecorator('altura',{
                                rules:[]
                            })(<Input placeholder="altura"/>)}
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <Form.Item label="Pulso" >
                            {getFieldDecorator('pulso',{

                            })(<Input placeholder="Pulso" />)}
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <Form.Item label="Respiracion">
                            {getFieldDecorator('respiracion',{

                            })(<Input placeholder="Respiracion" />)}
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <Form.Item label ="Temperatura">
                            {getFieldDecorator('temperatura',{

                            })(<Input placeholder="Temperatura" />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }} >
                            <Button type="primary" htmlType="submit" >
                                Guardar
                            </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default AddExpediente = Form.create({name:'expedient'})(AddExpediente)