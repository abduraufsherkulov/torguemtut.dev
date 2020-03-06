import React, { useEffect, useState, useContext } from 'react'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import {
    Link, withRouter,
    useHistory,
    useLocation
} from 'react-router-dom';
import axios from 'axios';
import FacebookAuth from '../facebook/FacebookAuth';
import { AuthContext } from '../../../contexts/AuthContext';

function LoginForm(props) {
    const [form] = Form.useForm();
    const { userData, dispatch } = useContext(AuthContext);
    const [checkUsername, setCheckUsername] = useState({ message: "Пожалуйста, введите адрес электронной почты или номер телефона!" });

    const [validateConfirmCode, setvalidateConfirmCode] = useState("")
    const [phone, setphone] = useState(null);
    const [password, setpassword] = useState(null);
    // const [isMail, setisMail] = useState(false);
    const [validateLoader, setvalidateLoader] = useState("");

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleFinishFailed = ({ errorFields }) => {
        console.log(errorFields)
        // form.scrollToField(errorFields[0].name);
    };



    const handleFinish = (values) => {
        setvalidateLoader('validating');


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
                        dispatch({ type: 'SIGN_IN', userData: JSON.stringify(response.data.userData) })
                        // localStorage.setItem('username', values.emailphone);
                        history.replace(from);
                    } else {
                        // localStorage.setItem('username', values.emailphone);

                        dispatch({ type: 'SIGN_IN', userData: JSON.stringify(response.data.userData) })
                        history.replace(from);
                    }
                    // window.location.replace("/");
                    // props.history.push('/');
                } else {
                    setvalidateConfirmCode('error');
                    setvalidateLoader('error');
                    form.setFields([{
                        name: 'password',
                        errors: [response.data.message],
                    }]);
                }
            })
            .catch(error => {
                console.log(error.response, "error on refresh");
                setvalidateConfirmCode('error');

                setvalidateLoader('error');

                form.setFields([{
                    name: 'password',
                    values: values.password,
                    errors: [error.response.data.message],
                }]);
            });

    };


    function validateEmailPhone(rule, value) {

        if (validateLoader === "error") {
            setvalidateLoader('success');
        } else if (validateConfirmCode === "error") {
            setvalidateConfirmCode('success')
        }
        return Promise.resolve();
    };


    function validatePass(rule, value) {
        if (validateConfirmCode === "error") {
            setvalidateConfirmCode('success')
        }

        return Promise.resolve();
    };

    return (
        <Row type="flex" justify="center">
            <Col xl={6} xxl={5} lg={10} style={{ zIndex: 1 }}>
                <div className="login-wrapper">
                    <h1>Вход в аккаунт</h1>
                    <div className="input-wrapper">
                        <Form form={form} scrollToFirstError onFinish={handleFinish} onFinishFailed={handleFinishFailed} className="login-form">
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

                            <Form.Item name="password" style={{ marginBottom: "10px" }} validateStatus={validateConfirmCode} hasFeedback rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                }, {
                                    validator: validatePass
                                }
                            ]}>
                                <Input.Password size="large"
                                    placeholder="Пароль" />
                            </Form.Item>
                            <Form.Item style={{ marginBottom: "10px" }}>
                                <Checkbox>Remember me</Checkbox>
                                <Link to="/forgot" className="login-form-forgot" href="">
                                    Забыли пароль?
                                </Link>
                                <Button style={{ marginTop: "33px" }} size="large" type="primary" htmlType="submit" className="login-form-button">
                                    Войти
                                </Button>
                            </Form.Item>

                            <p className="policy-span">При входе, вы принимаете условия <a className="policy-href" href="">Пользовательского соглашения и Политики конфиденциальности</a></p>
                            <Form.Item>
                                <p className="login-with-help">Войти с помощью:</p>
                                <div className="d-flex-centered">
                                    <FacebookAuth />
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


export default withRouter(LoginForm);
