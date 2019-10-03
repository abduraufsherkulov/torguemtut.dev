import React, { useEffect, useState } from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

function LoginForm(props) {
    const [checkUsername, setCheckUsername] = useState({ message: "Пожалуйста, введите адрес электронной почты или номер телефона!" });

    const [phone, setphone] = useState(null);
    const [password, setpassword] = useState(null);
    // const [isMail, setisMail] = useState(false);
    const [validateLoader, setvalidateLoader] = useState("");
    const { getFieldDecorator } = props.form;

    function handleSubmit(e) {
        e.preventDefault();
        setvalidateLoader('validating');
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const email = (values.emailphone[0] === "+" || typeof values.emailphone === "number") ? false : true;
                // let token = await AsyncStorage.getItem("access_token");

                const endpoint = "https://ttuz.azurewebsites.net/api/users/authenticate";

                const data = JSON.stringify({
                    Phone: email ? '' : values.emailphone,
                    Password: values.password,
                    IsEmail: email,
                    Email: email ? values.emailphone : ""
                });

                console.log(data);
                axios({
                    method: "post",
                    url: endpoint,
                    data: data,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => {
                        console.log(response);
                        if (response.data.status) {
                            if (email) {
                                localStorage.setItem('username', values.emailphone);
                            } else {
                                localStorage.setItem('username', values.emailphone);
                            }
                            window.location.replace("/");
                            // props.history.push('/');
                        } else {
                            setvalidateConfirmCode('error');
                            props.form.setFields({
                                confirmcode: {
                                    value: values.confirmcode,
                                    errors: [new Error(response.data.message)],
                                },
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error, "error on refresh");
                    });
            }
        });
    };


    function validateEmailPhone(rule, value, callback) {
        // if (value && confirmDirty) {
        //     props.form.validateFields(['emailphone'], { force: true });
        // }
        // if()
        if (validateLoader === "error") {
            setvalidateLoader('success');
        }
        callback();
    };

    return (
        <Row type="flex" justify="center">
            <Col xl={6} xxl={5} lg={10} style={{ zIndex: 1 }}>
                <div className="login-wrapper">
                    <h1>Вход в аккаунт</h1>
                    <div className="input-wrapper">
                        <Form onSubmit={handleSubmit} className="login-form">
                            <Form.Item hasFeedback validateStatus={validateLoader}>
                                {getFieldDecorator('emailphone', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your username!'
                                        },
                                        {
                                            validator: validateEmailPhone,
                                        }],
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


export default Form.create()(withRouter(LoginForm));
