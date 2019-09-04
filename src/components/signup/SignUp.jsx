import React from 'react'
import { Layout, Breadcrumb } from 'antd';
import GetPhone from '../home/GetPhone';
import SignUpForm from './SignUpForm';
import InfoSection from '../home/InfoSection';
const { Content } = Layout;

function SignUp() {
    return (
        <Content id="signin">
            <SignUpForm />
            <InfoSection />
            <GetPhone color="white" />
        </Content>
    )
}

export default SignUp
