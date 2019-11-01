import React, {
    useContext
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
import { withRouter } from 'react-router-dom'
import MainBreadcrumbs from '../MainBreadcrumbs';
import PicturesWall from './PicturesWall';
import GoogleMapsApi from './GoogleMapsApi';
import { CategoryContext } from '../../contexts/CategoryContext';
import YandexMapsApi from './YandexMapsApi';
const { TextArea } = Input;
const { Option } = Select;


function AddNewsAd(props) {

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
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    function onChange(value) {
        console.log(value);
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
                                    defaultValue={{ key: 'y.e.' }}
                                    placeholder="Выберите"
                                // onChange={this.handleSelectChange}
                                >
                                    <Option value="y.e.">y.e.</Option>
                                    <Option value="uzs">uzs</Option>
                                </Select>
                            </Form.Item>
                            <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                            <Form.Item style={{ display: 'inline-block', width: 'calc(26% - 16px)' }}>
                                <Checkbox >
                                    {/* checked={this.state.checkNick} onChange={this.handleChange} */}
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
                        <Form.Item label="Фотографии" style={{ marginBottom: 0 }}>
                            {getFieldDecorator('fotos', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Где Фотографии?',
                                    },
                                ],
                            })(<PicturesWall />)}

                        </Form.Item>
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
                        <GoogleMapsApi />
                        {/* <YandexMapsApi /> */}
                    </div>
                    <Divider />

                    <div className="makenarrow">
                        <h2>Ваши контактные данные</h2>
                        <Form.Item label="Контактное лицо">
                            {getFieldDecorator('сontact', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>


                        <Form.Item label="E-mail*">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item label="Контакты*">
                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<Input placeholder="Номер телефона" />)}
                                <Form.Item>
                                    {getFieldDecorator('email', {
                                        rules: [
                                            {
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            },
                                        ],
                                    })(<Input placeholder="Telegram" />)}
                                </Form.Item>
                            </Form.Item>
                        </Form.Item>
                    </div>
                    <Form.Item {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>
                                Я согласен <a href="">с</a>
                            </Checkbox>,
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Добавить объявление
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Form.create()(withRouter(AddNewsAd));
