import React from 'react'
import { Form, Input, Button, Checkbox, Row, Col, Select, Divider } from 'antd';
import { withRouter } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

const { TextArea } = Input;

function Disputes(props) {

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

    return (
        <div className="container">
            <h2>Споры и жалобы</h2>
            <p>Для связи с администрацией заполните форму</p>
            <Divider />
            <div className="disputes">
                <Row>
                    <Col span={12} offset={6}>
                        <Form onSubmit={handleSubmit} className="login-form">

                            <Form.Item>
                                <Select defaultValue="lucy" onChange={handleChange}>
                                    <Option value="jack">Жалоба на нарушение прав интеллектуальной собственности</Option>
                                    <Option value="lucy">Сообщить о нарушении (для лиц, не являющихся правообладателями)</Option>
                                    <Option value="Yiminghe">Нарушения по размещению</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input
                                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Ссылка на товар"
                                />
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


export default withRouter(Disputes);