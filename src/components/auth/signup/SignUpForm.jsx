
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import FacebookAuth from '../facebook/FacebookAuth';

function SignUpForm(props) {
    const [confirmDirty, setconfirmDirty] = useState(false);
    const [phone, setphone] = useState(null);
    const [password, setpassword] = useState(null);
    const [isMail, setisMail] = useState(false);
    const [validateLoader, setvalidateLoader] = useState("");
    const [validateConfirmCode, setvalidateConfirmCode] = useState("")
    const { getFieldDecorator } = props.form;

    function handleSubmit(e) {
        let url_string = window.location.href; //window.location.href
        let url = new URL(url_string);
        let refer = url.searchParams.get("ReferrerCode");
        console.log(refer ? refer : 0);
        e.preventDefault();
        setvalidateLoader('validating');
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const email = (values.emailphone[0] === "+" || typeof values.emailphone === "number") ? false : true;
                // let token = await AsyncStorage.getItem("access_token");

                const endpoint = "https://ttuz.azurewebsites.net/api/users/register";

                const data = JSON.stringify({
                    Phone: email ? '' : values.emailphone,
                    Password: values.password,
                    IsEmail: email,
                    Email: email ? values.emailphone : "",
                    ReferrerCode: refer ? +refer : 0
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
                        if (response.data.status) {
                            setphone(values.emailphone);
                            setpassword(values.password);
                            setisMail(email);
                            setvalidateLoader('success');
                        } else {

                            setvalidateLoader('error');
                            props.form.setFields({
                                emailphone: {
                                    value: values.emailphone,
                                    errors: [new Error(response.data.message)],
                                },
                            });
                        }

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
        console.log('here');
        props.form.validateFieldsAndScroll(['confirmcode'], (err, values) => {
            console.log(err);
            if (!err) {
                console.log('Received values of form: ', values);

                // let token = await AsyncStorage.getItem("access_token");
                const endpoint = "https://ttuz.azurewebsites.net/api/users/validate";

                const data = JSON.stringify({
                    Phone: isMail ? '' : phone,
                    Code: values.confirmcode,
                    IsEmail: isMail,
                    Email: isMail ? phone : ''
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
                        if (response.data.status) {
                            if (isMail) {
                                localStorage.setItem('username', phone);
                            } else {
                                localStorage.setItem('username', phone);
                            }
                            props.history.push('/');
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

    function validateEmailPhone(rule, value, callback) {
        // if (value && confirmDirty) {
        //     props.form.validateFields(['emailphone'], { force: true });
        // }
        // if()
        if (validateLoader === "error") {
            setvalidateLoader('success');
        } else if (validateConfirmCode === "error") {
            setvalidateConfirmCode('success')
        }
        callback();
    };

    function handleConfirmBlur(e) {
        const { value } = e.target;
        setconfirmDirty(confirmDirty || !!value);
    };
    const mainForm = (
        <Form onSubmit={handleSubmit} className="signin-form">
            <Form.Item name="emailphone" hasFeedback validateStatus={validateLoader} rules={[
                {
                    required: true,
                    message: 'Please input your username!'
                },
                {
                    validator: validateEmailPhone,
                }]}>
                <Input
                    size="large"
                    placeholder="E-mail или номер телефона"
                />
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
                        }
                    ],
                })(<Input.Password size="large"
                    placeholder="Придумайте пароль" />)}
            </Form.Item>
            <Form.Item name="confirm" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                {
                    validator: compareToFirstPassword,
                },
            ]}>
                <Input.Password placeholder="Подтвердите пароль" size="large" onBlur={handleConfirmBlur} />
            </Form.Item>
            <Form.Item name="privacypolicy" style={{ marginBottom: "10px" }}>
                <Checkbox>Я принимаю условия</Checkbox>
                <a className="signin-form-forgot" href="">
                    Пользовательского соглашения и Политики конфиденциальности
            </a>
                <Button style={{ marginTop: "33px" }} size="large" type="primary" htmlType="submit" className="signin-form-button">
                    Зарегистрироваться
            </Button>
            </Form.Item>
            <Form.Item>
                <p className="signin-with-help">Быстрая регистрация с помощью:</p>
                <div className="d-flex-centered">
                    <div><FacebookAuth /></div>

                </div>
                <div className="no-account">
                    <span>Уже зарегистрированы?</span><br /><Link style={{ width: '100%' }} to="/login">Войдите в систему!</Link>
                </div>
            </Form.Item>
        </Form>
    );
    const confirmCode = (
        <Form onSubmit={handleConfirmCode} className="signin-form">
            <Form.Item name="confirmcode" label="Код для подтверждения" hasFeedback validateStatus={validateConfirmCode} rules={[
                {
                    required: phone ? true : false,
                    len: 5,

                    message: 'Please input your confirm code?',
                }
            ]}>
                <Input.Password size="large"
                    placeholder="------" />
            </Form.Item>
            <Form.Item style={{ marginBottom: "10px" }}>
                <div className="d-flex-space-between">
                    <Button style={{ marginTop: "33px" }} size="large" className="signin-form-button" onClick={() => setphone("")}>
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
            <Col xl={6} xxl={5} lg={10} style={{ zIndex: 1 }}>
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


export default withRouter(SignUpForm);
