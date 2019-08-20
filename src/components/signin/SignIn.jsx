import React from 'react'
import { Layout, Breadcrumb } from 'antd';
import GetPhone from '../home/GetPhone';
import SignInForm from './SignInForm';
import InfoSection from '../home/InfoSection';
const { Content } = Layout;

function SignIn() {
    return (
        <Content id="signin">
            <SignInForm />
            <InfoSection />
            <GetPhone color="white" />
        </Content>
    )
}

export default SignIn
