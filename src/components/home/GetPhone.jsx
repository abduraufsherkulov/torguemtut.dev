import React from 'react'
import Phone from "../../images/phonepromo.png";
import Appstore from "../../images/appstore.png";
import Googleplay from "../../images/googleplay.png";
import { Row, Col, Form, Input, Select, Button } from 'antd';

const { Search } = Input;

const InputGroup = Input.Group;

function GetPhone() {
    return (
        <div id="getphone">
            <div className="container">
                <Row className="d-flex-centered" gutter={48}>
                    <Col span={5}>
                        <img src={Phone} alt="" />
                    </Col>
                    <Col span={11}>
                        <h1>Получите ссылку для скачивания приложения</h1>
                        <Form>
                            <Form.Item>
                                <InputGroup>
                                    <Search
                                    style={{width: "65%"}}
                                        addonBefore="+998"
                                        placeholder="xx-xxx-xx-xx"
                                        enterButton="Отправить"
                                        onSearch={value => console.log(value)}
                                    />
                                </InputGroup>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={8}>
                        <div className="d-flex-space-around">
                            <img src={Googleplay} alt="" />
                            <img src={Appstore} alt="" />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default GetPhone;