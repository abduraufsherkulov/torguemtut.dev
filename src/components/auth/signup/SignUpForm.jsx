
import React, { useEffect, useState, useContext } from 'react'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import FacebookAuth from '../facebook/FacebookAuth';
import { AuthContext } from '../../../contexts/AuthContext';

function SignUpForm(props) {
    const [form] = Form.useForm();

    const { userData, dispatch } = useContext(AuthContext);
    const [confirmDirty, setconfirmDirty] = useState(false);
    const [phone, setphone] = useState(null);
    const [password, setpassword] = useState(null);
    const [isMail, setisMail] = useState(false);
    const [validateLoader, setvalidateLoader] = useState("");
    const [validateConfirmLoader, setValidateConfirmLoader] = useState("");
    const [validateConfirmCode, setvalidateConfirmCode] = useState("")

    const handleFinishFailed = ({ errorFields }) => {
        console.log(errorFields)
        // form.scrollToField(errorFields[0].name);
    };



    const handleFinish = (values) => {
        let url_string = window.location.href; //window.location.href
        let url = new URL(url_string);
        let refer = url.searchParams.get("ReferrerCode");
        console.log(refer ? refer : 0);

        setvalidateLoader('validating');

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
                console.log(response)
                if (response.data.status) {
                    setphone(values.emailphone);
                    setpassword(values.password);
                    setisMail(email);
                    setvalidateLoader('success');
                } else {

                    console.log(response);
                    setvalidateLoader('error');

                    form.setFields([{
                        name: 'emailphone',
                        errors: [error.response.data.message],
                    }]);
                }

            })
            .catch(error => {
                console.log(error.response, "error on refresh");
            });
    };


    const handleConfirmFinish = (values) => {
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
            headers: {
                "content-type": "application/json"
            },
            data: data
        })
            .then(response => {
                if (response.data.status) {
                    dispatch({ type: 'SIGN_IN', userData: JSON.stringify(response.data.userData) })
                    // localStorage.setItem('username', values.emailphone);
                    history.replace(from);
                } else {
                    console.log(response.data)
                    setvalidateConfirmCode('error');
                    form.setFields([{
                        name: 'confirmcode',
                        errors: [response.data.message],
                    }]);
                }
            })
            .catch(error => {
                console.log(error, "error on refresh");
            });
    };


    function validateToNextPassword(rule, value) {
        if (value && confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        return Promise.resolve();
    };
    function compareToFirstPassword(rule, value) {
        if (value && value !== form.getFieldValue('password')) {
            return Promise.reject('Two passwords that you enter is inconsistent!');
        } else {
            return Promise.resolve();
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
        return Promise.resolve();
    };


    function validateConfirm(rule, value, callback) {
        if (validateConfirmLoader === "error") {
            setvalidateConfirmLoader('success');
        } else if (validateConfirmCode === "error") {
            setvalidateConfirmCode('success')
        }
        return Promise.resolve();
    };


    function handleConfirmBlur(e) {
        const { value } = e.target;
        setconfirmDirty(confirmDirty || !!value);
    };
    const mainForm = (
        <Form form={form} scrollToFirstError onFinish={handleFinish} onFinishFailed={handleFinishFailed} className="signin-form">
            <Form.Item name="emailphone" hasFeedback validateStatus={validateLoader} rules={[
                {
                    required: true,
                    type: 'email',
                    message: 'Email не является допустимым!'
                },
                {
                    validator: validateEmailPhone,
                }]}>
                <Input
                    size="large"
                    placeholder="E-mail"
                />
            </Form.Item>

            <Form.Item name="password" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                {
                    validator: validateToNextPassword,
                }
            ]}><Input.Password size="large"
                placeholder="Придумайте пароль" />
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
            <Form.Item style={{ marginBottom: "10px" }}>
                <Checkbox>Я принимаю условия</Checkbox>
                <a className="signin-form-forgot" href="">
                    Пользовательского соглашения и Политики конфиденциальности
            </a>
                <Button loading={validateLoader == "validating" ? true : false} style={{ marginTop: "33px" }} size="large" type="primary" htmlType="submit" className="signin-form-button">
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
        <Form form={form} onFinish={handleConfirmFinish} onFinishFailed={handleFinishFailed} className="signin-form">
            <Form.Item name="confirmcode" label="Код для подтверждения" hasFeedback validateStatus={validateConfirmCode} rules={[
                {
                    required: phone ? true : false,
                    len: 5,

                    message: 'Пожалуйста, введите ваш код подтверждения',
                },
                {
                    validator: validateConfirm
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
