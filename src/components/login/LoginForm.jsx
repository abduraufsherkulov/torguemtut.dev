import React, { useEffect, useState } from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LoginForm(props) {
    const [checkUsername, setCheckUsername] = useState({message: "Пожалуйста, введите адрес электронной почты или номер телефона!"});
    const { getFieldDecorator } = props.form;
      
    function handleSubmit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    return (
        <Row type="flex" justify="center">
            <Col xl={6} xxl={5} lg={10} style={{ zIndex: 1 }}>
                <div className="login-wrapper">
                    <h1>Вход в аккаунт</h1>
                    <div className="input-wrapper">
                        <Form onSubmit={handleSubmit} className="login-form">
                            <Form.Item hasFeedback validateStatus="">
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: checkUsername.message }],
                                })(
                                    <Input
                                        size="large"
                                        // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="E-mail или номер телефона"
                                    />,
                                )}
                            </Form.Item>

                            <Form.Item style={{ marginBottom: "10px" }} hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ],
                                })(<Input.Password size="large"
                                    placeholder="Пароль" />)}
                            </Form.Item>
                            <Form.Item style={{ marginBottom: "10px" }}>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>Remember me</Checkbox>)}
                                <a className="login-form-forgot" href="">
                                    Забыли пароль?
                                </a>
                                <Button style={{ marginTop: "33px" }} size="large" type="primary" htmlType="submit" className="login-form-button">
                                    Войти
                                </Button>
                            </Form.Item>

                            <p className="policy-span">При входе, вы принимаете условия <a className="policy-href" href="">Пользовательского соглашения и Политики конфиденциальности</a></p>
                            <Form.Item>
                                <p className="login-with-help">Войти с помощью:</p>
                                <div className="d-flex-space-between">
                                    <div>facebook</div>
                                    <div>google</div>

                                </div>
                                <div className="no-account">
                                    <span>Нет аккаунта?</span><Link to="/signup">Зарегистрируйтесь!</Link>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="shadow-login"></div>
                </div>
            </Col>
        </Row>
    )
}


export default Form.create()(LoginForm);
