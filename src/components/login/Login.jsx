import React from 'react'
import { Layout, Breadcrumb } from 'antd';
import GetPhone from '../home/GetPhone';
import LoginForm from './LoginForm';
const { Content } = Layout;

function Login() {
    return (
        <Content id="login">
            <LoginForm />
            <GetPhone color="white" />
        </Content>
    )
}

export default Login
