import React from 'react';
import Bg from "../../images/longback.png";
import { Row, Col, Form, Input, Select, Button, Icon } from 'antd';

const { Search } = Input;
const { Option } = Select;
const InputGroup = Input.Group;


function TopSearch() {
    return (
        <div id="topsearch">
            <div className="search-part">
                    <InputGroup size="large" compact>
                        <Input size="large" style={{ width: "70%" }} placeholder="Введите запрос поиска" />
                        <Select placeholder="Город, адрес, район" size="large" style={{ width: "25%" }}>
                            <Option value="Option1-1">Все категории</Option>
                            <Option value="Option1-2">Самарканд</Option>
                        </Select>
                        <Button style={{ width: "5%", background: "#ff9500", borderColor: "#ff9500", color: 'white' }} size="large"><Icon type="search" /></Button>
                    </InputGroup>
                    <p className="recentSearch">Сейчас ищут: iphone xr 64gb, черная маска, велосипед</p>
            </div>
        </div>
    )
}

export default TopSearch;