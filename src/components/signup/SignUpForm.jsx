
import React, { useEffect, useState } from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SignUpForm(props) {
    const [confirmDirty, setconfirmDirty] = useState(false);
    const [phone, setphone] = useState(null);
    const [password, setpassword] = useState(null);
    const [isMail, setisMail] = useState(false);
    const { getFieldDecorator } = props.form;
    console.log(phone);
    function handleSubmit(e) {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const email = (values.emailphone[0] === "+" || typeof values.emailphone === "number") ? false : true;
                // let token = await AsyncStorage.getItem("access_token");

                const endpoint = "https://ttuz.azurewebsites.net/api/users/register";

                const data = JSON.stringify({
                    Phone: values.emailphone,
                    Password: values.password,
                    IsEmail: email
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
                        // console.log("done");

                        setphone(values.phone);
                        setpassword(values.password);
                        setisMail(email);
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error.response, "error on refresh");
                    });
            }
        });
    };


    function handleConfirmCode(e) {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                // let token = await AsyncStorage.getItem("access_token");
                const endpoint = "https://ttuz.azurewebsites.net/api/users/register";

                const data = JSON.stringify({
                    Phone: values.confi,
                });
                console.log(data);
                axios({
                    method: "post",
                    url: endpoint,
                    // auth: {
                    //     username: "delivera",
                    //     password: "X19WkHHupFJBPsMRPCJwTbv09yCD50E2"
                    // },
                    headers: {
                        "content-type": "application/json"
                    },
                    data: data
                })
                    .then(response => {
                        // console.log("done");
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error, "error on refresh");
                    });
            }
        });
    };


    function validateToNextPassword(rule, value, callback) {
        if (value && confirmDirty) {
            props.form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    function compareToFirstPassword(rule, value, callback) {
        if (value && value !== props.form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    function handleConfirmBlur(e) {
        const { value } = e.target;
        setconfirmDirty(confirmDirty || !!value);
    };
    const mainForm = (
        <Form onSubmit={handleSubmit} className="signin-form">
            <Form.Item >
                {getFieldDecorator('emailphone', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input
                        size="large"
                        // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="E-mail или номер телефона"
                    />,
                )}
            </Form.Item>

            <Form.Item hasFeedback>
                {getFieldDecorator('password', {
                    rules: [
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            validator: validateToNextPassword,
                        },
                    ],
                })(<Input.Password size="large"
                    placeholder="Придумайте пароль" />)}
            </Form.Item>
            <Form.Item hasFeedback>
                {getFieldDecorator('confirm', {
                    rules: [
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        {
                            validator: compareToFirstPassword,
                        },
                    ],
                })(<Input.Password placeholder="Подтвердите пароль" size="large" onBlur={handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item style={{ marginBottom: "10px" }}>
                {getFieldDecorator('privacypolicy', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(<Checkbox>Я принимаю условия</Checkbox>)}
                <a className="signin-form-forgot" href="">
                    Пользовательского соглашения и Политики конфиденциальности
            </a>
                <Button style={{ marginTop: "33px" }} size="large" type="primary" htmlType="submit" className="signin-form-button">
                    Зарегистрироваться
            </Button>
            </Form.Item>
            <Form.Item>
                <p className="signin-with-help">Быстрая регистрация с помощью:</p>
                <div className="d-flex-space-between">
                    <div>facebook</div>
                    <div>google</div>

                </div>
                <div className="no-account">
                    <span>Уже зарегистрированы?</span><br /><Link style={{ width: '100%' }} to="/login">Войдите в систему!</Link>
                </div>
            </Form.Item>
        </Form>
    );
    const confirmCode = (
        <Form onSubmit={handleConfirmCode} className="signin-form">
            <Form.Item label="Код для подтверждения" hasFeedback>
                {getFieldDecorator('confirmcode', {
                    rules: [
                        {
                            required: phone ? true : false,
                            len: 5,
                            
                            message: 'Please input your password!',
                        }
                    ],
                })(<Input.Password size="large"
                    placeholder="------" />)}
            </Form.Item>
            <Form.Item style={{ marginBottom: "10px" }}>
                <div className="d-flex-space-between">
                    <Button style={{ marginTop: "33px" }} size="large" className="signin-form-button">
                        Назад
                    </Button>
                    <Button style={{ marginTop: "33px" }} size="large" type="primary" htmlType="submit" className="signin-form-button">
                        Подтвердить
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
    return (
        <Row type="flex" justify="center">
            <Col xl={5} lg={10} style={{ zIndex: 1 }}>
                <div className="signin-wrapper">
                    <h1>Регистрация пользователя</h1>
                    <div className="input-wrapper">
                        {phone ? confirmCode : mainForm}
                    </div>
                    <div className="shadow-signin"></div>
                </div>
            </Col>
        </Row>
    )
}


export default Form.create()(SignUpForm);
