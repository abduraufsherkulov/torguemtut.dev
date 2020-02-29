import React, { useContext } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {
    Link, withRouter,
} from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

function Settings(props) {
    const { userData } = useContext(AuthContext)
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    const { getFieldDecorator } = props.form;
    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                <Input
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email"
                    value={userData.email}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<PhoneOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Phone"
                    value={userData.phone}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<ShareAltOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Referral"
                    readOnly
                    value={`https://tt.uz/signup/?ReferrerCode=${userData.referralCode}`}
                />
            </Form.Item>
            <Form.Item>
                <Button>Facebook</Button>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
          </Button>
            </Form.Item>
        </Form>
    )
}

export default withRouter(Settings);
