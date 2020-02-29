import React from 'react'
import { Form, Input, Button, Checkbox, Row, Col, Select, Divider } from 'antd';
import { withRouter } from 'react-router-dom';


const { TextArea } = Input;

function SupportService(props) {

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    const { getFieldDecorator } = props.form;
    return (
        <div className="container">
            <h2>Служба поддержки</h2>
            <p>Для связи с администрацией заполните форму</p>
            <Divider />
            <div className="supportservice">
                <Row>
                    <Col span={12} offset={6}>
                        <Form onSubmit={handleSubmit} className="login-form">
                            <Form.Item label="Выберите тему" layout="vertical">
                                <Select defaultValue="lucy" onChange={handleChange}>
                                    <Option value="jack">Платные услуги</Option>
                                    <Option value="lucy">Вопросы по использованию сайта</Option>
                                    <Option value="Yiminghe">Другое</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <TextArea placeholder="Текст сообщения" rows={4} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Отправить
                  </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    );
}


export default withRouter(SupportService);