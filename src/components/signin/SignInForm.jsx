import React, { useEffect } from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

function SignInForm(props) {
    const { getFieldDecorator } = props.form;
    function handleSubmit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    function validateToNextPassword(rule, value, callback) {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    function compareToFirstPassword(rule, value, callback) {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    function handleConfirmBlur(e) {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    return (
        <Row type="flex" justify="center">
            <Col xl={5} lg={10} style={{ zIndex: 1 }}>
                <div className="signin-wrapper">
                    <h1>Регистрация пользователя</h1>
                    <div className="input-wrapper">
                        <Form onSubmit={handleSubmit} className="signin-form">
                            <Form.Item >
                                {getFieldDecorator('username', {
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
                                {getFieldDecorator('remember', {
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
                    </div>
                    <div className="shadow-signin"></div>
                </div>
            </Col>
        </Row>
    )
}


export default Form.create()(SignInForm);
