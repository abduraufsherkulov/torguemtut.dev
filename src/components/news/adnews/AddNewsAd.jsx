import React, {
    useContext, useState, useMemo
} from 'react'
import {
    Form,
    Input,
    Breadcrumb,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Divider,
    Button,
    AutoComplete,
    InputNumber,
    message
} from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import MainBreadcrumbs from '../../MainBreadcrumbs';
import PicturesWall from './PicturesWall';
import GoogleMapsApi from './GoogleMapsApi';
import { CategoryContext } from '../../../contexts/CategoryContext';
import YandexMapsApi from './YandexMapsApi';
import { IconFont } from '../../Icons/Icons';
import { AuthContext } from '../../../contexts/AuthContext';
import { MyAdsContext } from '../../../contexts/MyAdsContext';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Option } = Select;




function AddNewsAd(props) {
    const [form] = Form.useForm();
    const { myAds, setActiveKey, setMyAds } = useContext(MyAdsContext);
    const authContext = useContext(AuthContext);
    const { userData, dispatch } = authContext;
    const [checked, setChecked] = useState(false);
    const [selectChange, setSelectChange] = useState(1);
    const [loading, setLoading] = useState(false);
    const [cascaderLoading, setCascaderLoading] = useState(false);
    const [attr, setAttr] = useState([]);

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



    const handleFinish = values => {
        setLoading(true);
        console.log(values)
        if (values.photos == undefined || values.photos.fileList.length == 0) {
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
            // NewsAttribute: [{"AttributeId" : 123, "Value" : "adasdasd"}]
            const endpoint = "https://ttuz.azurewebsites.net/api/news/add";
            console.log(values)
            // return false;
            let newAttr = [];
            for (let i = 0; i < attr.length; i++) {
                newAttr.push({ AttributeId: attr[i].id, Value: attr[i].name in values ? (typeof values[attr[i].name] == "object" ? values[attr[i].name].key : values[attr[i].name]) : false })
            }

            const data = JSON.stringify({
                NewsAttribute: newAttr,
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
            console.log(data);
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
                if (response.data.status) {
                    setActiveKey('waiting');
                    setMyAds([...myAds, response.data.data]);
                    props.history.push('/myads');
                }
            }).catch(error => {
                if (error.response.status == 401) {
                    message.info('Сессия истекла', 2);
                    dispatch({ type: 'SIGN_IN' })
                }
                console.log(error.response)
            })
        }
    };

    const handleCheck = () => {
        setChecked(!checked)
    }
    const handleSelectChange = (params) => {
        console.log(params)
    }

    const handleCascader = (value) => {
        setCascaderLoading(true);
        const attr = value[value.length - 1];
        const endpoint = `https://ttuz.azurewebsites.net/api/category/get-category-attributes?Id=${attr}`;
        axios({
            method: 'get',
            url: endpoint,
            headers: {
                "content-type": "application/json"
            }
        }).then(response => {
            setCascaderLoading(false)
            setAttr(response.data);
        }).catch(error => {
            console.log(error)
        })
    }


    function AttrSelect({ item }) {
        return (
            <Form.Item name={item.name} label={item.title} rules={[
                {
                    required: item.required,
                    message: `Где ${item.title}?`,
                },
            ]}>
                <Select
                    labelInValue
                    placeholder="Выберите"
                    onChange={handleSelectChange}>
                    {
                        item.attributeOptions.map((attritem, index) => {
                            return (
                                <Option key={attritem.id} value={attritem.value}>{attritem.value}</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
        )
    }

    function AttrInput({ item }) {
        return (
            <Form.Item name={item.name} label={item.title} rules={[
                {
                    required: true,
                    message: `Где ${item.title}?`,
                },
            ]}>
                <Input />
            </Form.Item>
        )
    }

    const Just = () => {
        return (
            attr.map((item, index) => {
                if (item.attributeOptions.length > 0) {
                    return (
                        <AttrSelect item={item} key={item.name} />
                    )
                } else {
                    return (
                        <AttrInput item={item} key={item.name} />
                    )
                }
            })
        )
    }
    const MemoizedValue = useMemo(() => Just, [attr]);
    return (
        <div className="container">
            <div id="addnews">
                <MainBreadcrumbs />
                <h2 className="header-text">Добавить объявление</h2>
                <Form {...formItemLayout} onFinish={handleFinish}>
                    <div className="makenarrow">
                        <Form.Item name='title' label="Заголовок" rules={[
                            {
                                required: true,
                                message: 'Где заголовок?',
                            },
                        ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="category" hasFeedback={cascaderLoading} validateStatus="validating" label="Категория" rules={[
                            {
                                required: true,
                                message: 'Где категории?',
                            },
                        ]}>
                            <Cascader onChange={handleCascader} options={category} placeholder="Выбрать категории" />
                        </Form.Item>
                        <MemoizedValue />
                        <Form.Item label="Цена" style={{ marginBottom: 0 }}>
                            <Form.Item
                                // help="Please select the correct date"
                                style={{ display: 'inline-block', width: 'calc(37% - 16px)' }}
                                name='price'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Где заголовок?',
                                    },
                                ]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    // defaultValue={1000}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    // onChange={onChange}
                                    placeholder="1000"
                                />
                            </Form.Item>
                            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(37% - 16px)' }}>
                                <Select
                                    defaultValue='1'
                                    placeholder="Выберите"
                                    onChange={handleSelectChange}
                                >
                                    <Option value="1">usd</Option>
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
                        <Form.Item name='description' label="Описание" style={{ marginBottom: 0 }} rules={[
                            {
                                required: true,
                                message: 'Где Описание?',
                            },
                        ]}>
                            <TextArea rows={4} />
                        </Form.Item>
                        <PicturesWall
                            setFileValidate={setFileValidate}
                            fileValidate={fileValidate}
                            setFileRequired={setFileRequired}
                            fileRequired={fileRequired} />
                    </div>
                    <Divider />

                    <div className="makenarrow">
                        <h2>Местоположение</h2>
                        <Form.Item name='address' label="Адрес" rules={[
                            {
                                required: true,
                                message: 'Где адрес!',
                            },
                        ]}>
                            <Input />
                        </Form.Item>
                        <GoogleMapsApi defaultZoom={6} position={position} setPosition={setPosition} />
                        {/* <YandexMapsApi /> */}
                    </div>
                    <Divider />

                    <div className="makenarrow">
                        <h2>Ваши контактные данные</h2>
                        <Form.Item name="contactperson" label="Контактное лицо" rules={[
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}>
                            <Input />
                        </Form.Item>


                        <Form.Item label="E-mail*">
                            <Input value={userData.email} disabled={true} suffix={<MailOutlined />} />
                        </Form.Item>

                        <Form.Item label="Контакты">
                            <Input value={userData.phone} disabled={true} placeholder="Номер телефона" suffix={<PhoneOutlined />} />
                        </Form.Item>

                        <Form.Item name="telegram" label="Телеграм" rules={[
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}>
                            <Input placeholder="Telegram" suffix={<IconFont type="icon-telegram" />} />
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

export default withRouter(AddNewsAd);
