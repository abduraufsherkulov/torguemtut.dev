import React from 'react';
import Bg from "../../images/longback.png";
import { Row, Col, Form, Input, Select, Button, Icon } from 'antd';

const { Search } = Input;
const { Option } = Select;
const InputGroup = Input.Group;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1336473_wci8yuw8ubp.js',
});

function MainSearch() {
    return (
        <div id="search">
            <div className="container" >
                <div className="search-part">
                    <InputGroup size="large" compact>
                        <Input size="large" style={{ width: "40%" }} addonBefore={<Icon type="search" />} placeholder="Введите запрос поиска" />
                        <Input size="large" suffix="$" style={{ width: "10%" }} placeholder="до" />
                        <Select placeholder="Сортировка" size="large" style={{ width: "20%" }}>
                            <Option value="Select.Option1-1">Последние</Option>
                            <Option value="Select.Option1-2">Старые</Option>
                        </Select>
                        <Select placeholder="Город, адрес, район" size="large" style={{ width: "30%" }}>
                            <Option value="Option1-1">Ташкент</Option>
                            <Option value="Option1-2">Самарканд</Option>
                        </Select>
                    </InputGroup>
                </div>
                <div className="bottom-part">
                    <Row type="flex" align="middle">
                        <Col span={12}>
                            <p>Сейчас ищут: iphone xr 64gb, черная маска, велосипед</p>
                        </Col>
                        <Col span={8} style={{textAlign: "right"}}>
                            <h1> <IconFont style={{marginRight: "5px"}} type="icon-pin" />Показать на карте</h1>
                        </Col>
                        <Col span={4} style={{textAlign: "right"}}>
                            <Button size="large" type="warning">Найти</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default MainSearch;