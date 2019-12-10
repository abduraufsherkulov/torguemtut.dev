import React, { useState } from 'react';
import Bg from "../../images/longback.png";
import { Row, Col, Form, Input, Select, Button, Icon } from 'antd';
import axios from 'axios';
const { Search } = Input;
const { Option } = Select;
const InputGroup = Input.Group;

let timer = null;
function TopSearch() {
    const [searchTitle, setSearchTitle] = useState("");
    const [send, setSend] = useState(false);
    const handleSubmit = (e) => {
        let data = JSON.stringify({
            title: e
        })
        const endpoint = "https://ttuz.azurewebsites.net/api/news/get-all";
        axios({
            method: "post",
            url: endpoint,
            data: data,
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => {
                console.log(response.data);
                // return response.data;
            })
            .catch(error => {
                console.log(error, "error in categories");
            });
    }
    const handleChange = (e) => {
        e.preventDefault();
        let value = e.target.value;
        setSearchTitle(value);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            handleSubmit(value)
        }, 2000);

    }
    return (
        <div id="topsearch">
            <div className="search-part">
                <InputGroup size="large" compact>
                    <Input value={searchTitle} onChange={handleChange} size="large" style={{ width: "70%" }} placeholder="Введите запрос поиска" />
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