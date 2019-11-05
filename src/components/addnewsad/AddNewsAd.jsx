import React, {
    useContext, useState
} from 'react'
import {
    Form,
    Input,
    Breadcrumb,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Divider,
    Button,
    AutoComplete,
    InputNumber
} from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import MainBreadcrumbs from '../MainBreadcrumbs';
import PicturesWall from './PicturesWall';
import GoogleMapsApi from './GoogleMapsApi';
import { CategoryContext } from '../../contexts/CategoryContext';
import YandexMapsApi from './YandexMapsApi';
import { IconFont } from '../Icons/Icons';
import { AuthContext } from '../../contexts/AuthContext';
const { TextArea } = Input;
const { Option } = Select;


function AddNewsAd(props) {


    const authContext = useContext(AuthContext);
    const { userData, dispatch } = authContext;
    const [checked, setChecked] = useState(false);
    const [selectChange, setSelectChange] = useState(1);
    const [loading, setLoading] = useState(false);

    const [fileRequired, setFileRequired] = useState("");
    const [fileValidate, setFileValidate] = useState("");

    const [position, setPosition] = useState({
        RegionId: 1,
        DistrictId: 1,
        Address: "",
        Longtitude: 69.279718,
        Latitude: 41.311157
    })

    const { category } = useContext(CategoryContext);

    const { getFieldDecorator } = props.form;


    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            setLoading(true);
            if (err || values.photos == undefined || values.photos.fileList.length == 0) {
                if (values.photos == undefined || values.photos.fileList.length == 0) {
                    setFileValidate('error')
                    setFileRequired("Файл необходимо");
                }
                setLoading(false);
            } else {
                console.log('called')
                let images = [];
                values.photos.fileList.map(i => {
                    images.push(i.response.imageId);
                })
                images = images.toString();

                const endpoint = "https://ttuz.azurewebsites.net/api/news/add";

                const data = JSON.stringify({
                    Title: values.title,
                    CategoryId: values.category[values.category.length - 1],
                    Price: {
                        Amount: values.price,
                        Currency: +selectChange,
                        Exchange: false,
                        Free: false,
                        Negotiatable: checked
                    },
                    Description: values.description,
                    Location: position,
                    ContactDetail: {
                        Name: values.contactperson,
                        IsIndividual: true,
                        Email: userData.email,
                        Phone: userData.phone
                    },
                    Status: 1,
                    ImageIds: images
                });

                axios({
                    method: 'post',
                    url: endpoint,
                    data: data,
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${userData.token}`
                    }
                }).then(response => {
                    console.log(response);
                    if(response.data.status){
                        props.history.push('/myads');
                    }

                }).catch(error => {
                    console.log(error.response)
                })
            }

        });
    };

    const handleCheck = () => {
        setChecked(!checked)
    }
    const handleSelectChange = (params) => {
        console.log(params)
    }

    return (
        <div className="container">
            <div id="addnews">
                <MainBreadcrumbs />
                <h2 className="header-text">Добавить объявление</h2>
                <Form {...formItemLayout} onSubmit={handleSubmit}>
                    <div className="makenarrow">
                        <Form.Item label="Заголовок">
                            {getFieldDecorator('title', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Где заголовок?',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Категория">
                            {getFieldDecorator('category', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Где категории?',
                                    },
                                ],
                            })(<Cascader options={category} placeholder="Выбрать категории" />)}

                        </Form.Item>
                        <Form.Item label="Цена" style={{ marginBottom: 0 }}>
                            <Form.Item
                                // help="Please select the correct date"
                                style={{ display: 'inline-block', width: 'calc(37% - 16px)' }}
                            >
                                {getFieldDecorator('price', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Где заголовок?',
                                        },
                                    ],
                                })(
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        // defaultValue={1000}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        // onChange={onChange}
                                        placeholder="1000"
                                    />)}
                            </Form.Item>
                            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(37% - 16px)' }}>
                                <Select
                                    labelInValue
                                    defaultValue={{ key: '1' }}
                                    placeholder="Выберите"
                                    onChange={handleSelectChange}
                                >
                                    <Option value="1">y.e.</Option>
                                    <Option value="2">uzs</Option>
                                </Select>
                            </Form.Item>
                            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(26% - 16px)' }}>
                                <Checkbox checked={checked} onChange={handleCheck}>
                                    Возможен торг
                            </Checkbox>
                            </Form.Item>
                        </Form.Item>
                    </div>
                    <Divider />

                    <div className="makenarrow">
                        <Form.Item label="Описание" style={{ marginBottom: 0 }}>
                            {getFieldDecorator('description', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Где Описание?',
                                    },
                                ],
                            })(<TextArea rows={4} />)}
                        </Form.Item>
                        <PicturesWall
                            setFileValidate={setFileValidate}
                            fileValidate={fileValidate}
                            setFileRequired={setFileRequired}
                            fileRequired={fileRequired}
                            getFieldDecorator={getFieldDecorator} />
                    </div>
                    <Divider />

                    <div className="makenarrow">
                        <h2>Местоположение</h2>
                        <Form.Item label="Адрес">
                            {getFieldDecorator('address', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Где адрес!',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <GoogleMapsApi position={position} setPosition={setPosition} />
                        {/* <YandexMapsApi /> */}
                    </div>
                    <Divider />

                    <div className="makenarrow">
                        <h2>Ваши контактные данные</h2>
                        <Form.Item label="Контактное лицо">
                            {getFieldDecorator('сontactperson', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>


                        <Form.Item label="E-mail*">
                            <Input value={userData.email} disabled={true} suffix={<Icon type="mail" />} />
                        </Form.Item>

                        <Form.Item label="Контакты">
                            <Input value={userData.phone} disabled={true} placeholder="Номер телефона" suffix={<Icon type="phone" />} />
                        </Form.Item>

                        <Form.Item label="Телеграм">
                            {getFieldDecorator('telegram', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(<Input placeholder="Telegram" suffix={<IconFont type="icon-telegram" />} />)}
                        </Form.Item>
                    </div>

                    {/* <Form.Item {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>
                                Я согласен <a href="">с</a>
                            </Checkbox>,
                        )}
                    </Form.Item> */}
                    <Form.Item {...tailFormItemLayout}>
                        <Button loading={loading} type="primary" htmlType="submit">
                            Добавить объявление
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Form.create()(withRouter(AddNewsAd));
