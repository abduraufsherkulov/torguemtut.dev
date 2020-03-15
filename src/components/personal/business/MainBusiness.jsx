import React, { useContext, useState, useEffect } from 'react';
import ComingSoon from '../../../images/coming_soon.gif';
import UploadPhoto from './UploadPhoto';
import { Form, Input, Button, Select, Cascader, message } from 'antd';
import { AuthContext } from '../../../contexts/AuthContext';
import { UserOutlined, PhoneOutlined, AlignLeftOutlined, PauseOutlined, BuildOutlined } from '@ant-design/icons';
import { SoatoContext } from '../../../contexts/SoataContext';
import axios from 'axios';
import { BusinessContext } from '../../../contexts/BusinessContext';

function MainBusiness() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const { userData, dispatch } = useContext(AuthContext)
    const { businessInfo, setBusinessInfo } = useContext(BusinessContext)
    const [defaultUrl, setDefaultUrl] = useState(null);
    const { soato } = useContext(SoatoContext)

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 },
        },
    };

    const handleSubmit = values => {
        setLoading(true)
        console.log(values)
        console.log(values.photos.file.response.imageId)
        const data = JSON.stringify({
            Name: values.companyTitle,
            Description: values.description,
            Street: values.street,
            Building: values.numberBuilding,
            Region: values.soato[0],
            District: values.soato[1],
            Phone: values.phone,
            Logo: values.photos.file.response.imageId,

        })

        const endpoint = "https://tt.delivera.uz/api/users/add-business-entity";
        axios({
            method: 'post',
            url: endpoint,
            data: data,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            setLoading(false)
            console.log(response);
        }).catch(error => {
            if (error.response.status == 401) {
                message.info('Сессия истекла', 2);
                dispatch({ type: 'SIGN_IN' })
            }
        })
    };
    useEffect(() => {
        if (businessInfo && businessInfo.logoImage) {
            setDefaultUrl(`https://tt.delivera.uz/Resources/Images/${businessInfo.logoImage.path}`)
        }

    }, [businessInfo])
    return businessInfo && (
        <Form {...formItemLayout} onFinish={handleSubmit}
            form={form}
            initialValues={{
                companyTitle: businessInfo.name,
                description: businessInfo.description,
                street: businessInfo.street,
                numberBuilding: businessInfo.building,
                soato: [businessInfo.region, businessInfo.district],
                phone: businessInfo.phone,
                photos: {
                    file: {
                        response: {
                            status: true,
                            imageId: businessInfo.logoImage ? businessInfo.logoImage.imageId : null
                        }
                    }
                }
            }} className="login-form">
            <Form.Item name="companyTitle" label="Название компании" rules={[
                {
                    required: true,
                    message: 'Где адрес!',
                },
            ]}>
                <Input
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Название компании"
                />
            </Form.Item>
            <Form.Item name="description" label="Описание" rules={[
                {
                    required: true,
                    message: 'Где адрес!',
                },
            ]}>
                <Input
                    prefix={<AlignLeftOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Описание"
                />
            </Form.Item>
            <Form.Item name="soato" label="Адрес" rules={[
                {
                    required: true,
                    message: 'Где адрес!',
                },
            ]}>
                <Cascader options={soato} placeholder="Выбрать адрес" />
            </Form.Item>
            <Form.Item name="street" label="Улица" rules={[
                {
                    required: true,
                    message: 'Где адрес!',
                },
            ]}>
                <Input
                    prefix={<PauseOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Улица"
                />
            </Form.Item>
            <Form.Item name="numberBuilding" label="Номер здания" rules={[
                {
                    required: true,
                    message: 'Где адрес!',
                },
            ]}>
                <Input
                    prefix={<BuildOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Номер здания"
                />
            </Form.Item>
            <Form.Item name="phone" label="Номер телефона" rules={[
                {
                    required: true,
                    message: 'Где адрес!',
                },
            ]}>
                <Input
                    prefix={<PhoneOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Номер телефона"
                />
            </Form.Item>
            <UploadPhoto defaultUrl={defaultUrl} />
            <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
                    Отправить
          </Button>
            </Form.Item>
        </Form>
    )
}

export default MainBusiness
