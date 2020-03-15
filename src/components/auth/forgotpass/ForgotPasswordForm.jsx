import React, { useEffect, useState, useContext } from 'react'
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import {
    Link, withRouter,
    useHistory,
    useLocation
} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';

function ForgotPasswordForm(props) {
    const { userData, dispatch } = useContext(AuthContext);
    const [checkUsername, setCheckUsername] = useState({ message: "Пожалуйста, введите адрес электронной почты или номер телефона!" });

    const [validateConfirmCode, setvalidateConfirmCode] = useState("")
    const [phone, setphone] = useState(null);
    const [password, setpassword] = useState(null);
    const [validateLoader, setvalidateLoader] = useState("");

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    function handleSubmit(e) {
        e.preventDefault();
        setvalidateLoader('validating');
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const email = (values.emailphone[0] === "+" || typeof values.emailphone === "number") ? false : true;
                // let token = await AsyncStorage.getItem("access_token");

                const endpoint = "https://tt.delivera.uz/api/users/forget-password";

                const data = JSON.stringify({
                    Phone: email ? '' : values.emailphone,
                    IsEmail: email,
                    Email: email ? values.emailphone : "",
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
                            setvalidateLoader('success');
                            message.success(`Норый пароль отправлен в ${values.emailphone}`, 3);
                            // history.replace(from);
                            props.history.push('/login');
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


    function validateEmailPhone(rule, value, callback) {
        // if (value && confirmDirty) {
        //     props.form.validateFields(['emailphone'], { force: true });
        // }
        // if()

        // dispatch({ type: 'SIGN_IN', username: value })
        if (validateLoader === "error") {
            setvalidateLoader('success');
        } else if (validateConfirmCode === "error") {
            console.log('call')
            setvalidateConfirmCode('success')
        }
        callback();
    };
    return (
        <Row type="flex" justify="center">
            <Col xl={6} xxl={5} lg={10} style={{ zIndex: 1 }}>
                <div className="login-wrapper">
                    <h1>Восстановление пароля</h1>
                    <div className="input-wrapper">
                        <Form onSubmit={handleSubmit} className="login-form">
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
                            <Form.Item style={{ marginBottom: "10px" }}>
                                <Button style={{ marginTop: "33px" }} size="large" type="primary" htmlType="submit" className="login-form-button">
                                    Отправить
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="shadow-login"></div>
                </div>
            </Col>
        </Row>
    )
}


export default withRouter(ForgotPasswordForm);
