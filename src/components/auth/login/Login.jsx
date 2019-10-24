import React from 'react'
import { Layout, Breadcrumb } from 'antd';
import LoginForm from './LoginForm';
import GetPhone from '../../home/GetPhone';
const { Content } = Layout;

function Login() {
    return (
        <Content id="login">
            <LoginForm />
            <GetPhone color="white"/>
        </Content>
    )
}

export default Login
