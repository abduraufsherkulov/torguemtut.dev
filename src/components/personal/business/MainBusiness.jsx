import React, { useContext, useState } from 'react';
import ComingSoon from '../../../images/coming_soon.gif';
import UploadPhoto from './UploadPhoto';
import { Form, Input, Button, Select } from 'antd';
import { AuthContext } from '../../../contexts/AuthContext';
import { UserOutlined, PhoneOutlined, ShareAltOutlined } from '@ant-design/icons';

function MainBusiness() {
    const [form] = Form.useForm();
    const { userData } = useContext(AuthContext)
    const [fileRequired, setFileRequired] = useState("");
    const [fileValidate, setFileValidate] = useState("");

    const [companyTitle, setCompanyTitle] = useState("");
    const [description, setDescription] = useState("");
    const [street, setStreet] = useState("")
    const [apartment, setApartment] = useState("")
    const [soato, setSoato] = useState("")
    const [phone, setPhone] = useState("")

    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                <Input
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Название компании"
                    value={companyTitle}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<PhoneOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Описание"
                    value={description}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<ShareAltOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Улица"
                    readOnly
                    value={street}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<ShareAltOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Номер здания"
                    readOnly
                    value={apartment}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<ShareAltOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Город"
                    readOnly
                    value={soato}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<ShareAltOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Номер телефона"
                    readOnly
                    value={phone}
                />
            </Form.Item>
            <UploadPhoto
                setFileValidate={setFileValidate}
                fileValidate={fileValidate}
                setFileRequired={setFileRequired}
                fileRequired={fileRequired} />
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Отправить
          </Button>
            </Form.Item>
        </Form>
    )
}

export default MainBusiness
