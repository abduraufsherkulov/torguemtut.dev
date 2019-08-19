import React, { useEffect } from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';

function LoginForm(props) {
    const { getFieldDecorator } = props.form;
    function handleSubmit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    useEffect(() => {
        function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
            console.log('statusChangeCallback');
            console.log(response);                   // The current login status of the person.
            if (response.status === 'connected') {   // Logged into your webpage and Facebook.
                testAPI();
            } else {                                 // Not logged into your webpage or we are unable to tell.
                document.getElementById('status').innerHTML = 'Please log ' +
                    'into this webpage.';
            }
        }


        function checkLoginState() {               // Called when a person is finished with the Login Button.
            FB.getLoginStatus(function (response) {   // See the onlogin handler
                statusChangeCallback(response);
            });
        }


        window.fbAsyncInit = function () {
            FB.init({
                appId: '2496083423969818',
                cookie: true,                     // Enable cookies to allow the server to access the session.
                xfbml: true,                     // Parse social plugins on this webpage.
                version: 'v4'           // Use this Graph API version for this call.
            });


            FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
                statusChangeCallback(response);        // Returns the login status.
            });
        };


        (function (d, s, id) {                      // Load the SDK asynchronously
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


        function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
                console.log('Successful login for: ' + response.name);
                document.getElementById('status').innerHTML =
                    'Thanks for logging in, ' + response.name + '!';
            });
        }
        return () => {
            cleanup
        };
    }, [])
    return (
        <Row type="flex" justify="center">
            <Col span={5}>
                <div className="login-wrapper">
                    <h1>Вход в аккаунт</h1>
                    <div className="input-wrapper">
                        <Form onSubmit={handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        size="large"
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item style={{marginBottom: "7px"}}>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                        size="large"
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item style={{marginBottom: "10px"}}>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>Remember me</Checkbox>)}
                                <a className="login-form-forgot" href="">
                                    Забыли пароль?
                                </a>
                                <Button style={{marginTop: "33px"}} size="large" type="primary" htmlType="submit" className="login-form-button">
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
                                    <span>Нет аккаунта?</span> <a href="">Зарегистрируйтесь!</a>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                    
                </div>
                
            </Col>
        </Row>
    )
}


export default Form.create()(LoginForm);
