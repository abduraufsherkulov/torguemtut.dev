import React from 'react'
import { Layout, Breadcrumb } from 'antd';
import LoginForm from './ForgotPasswordForm';
import GetPhone from '../../home/GetPhone';
const { Content } = Layout;

function ForgotPassword() {
    return (
        <Content id="login">
            <LoginForm />
            <GetPhone color="white" />
        </Content>
    )
}

export default ForgotPassword
