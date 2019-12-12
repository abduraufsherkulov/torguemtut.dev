import React, { useState } from 'react';
import Bg from "../../images/longback.png";
import { Row, Col, Form, Input, Select, Button, Icon, AutoComplete } from 'antd';
import { Link } from 'react-router-dom'
import axios from 'axios';
const { Search } = Input;
const { Option } = Select;
const { Option: Optioner } = AutoComplete;
const InputGroup = Input.Group;



let timer = null;
function TopSearch() {
    const [searchTitle, setSearchTitle] = useState("");
    const [send, setSend] = useState(false);
    const [dataSource, setDataSource] = useState([])

    const handleSubmit = (e) => {
        console.log(e)
        let data = JSON.stringify({
            title: e
        })
        // return [];
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
                setDataSource(response.data)
                console.log(response.data);
            })
            .catch(error => {
                console.log(error, "error in categories");
            });

    }


    function onSelect(value) {
        console.log('onSelect', value);
    }
    function renderOption(item) {
        console.log(item);
        return (
            <Optioner key={item.id} text={item.category.name}>
                <div className="global-search-item">
                    <span className="global-search-item-desc">
                        <Link
                            to={`/subcategories/${item.category.id}`}
                        >
                            <span className="search-word">{ searchTitle}</span> {" "} <span className="from-to">в рубрике</span> {" "}

                            <span className="from-category">{item.category.name}</span>
                        </Link>
                        {" "}
                    </span>
                    {/* <span className="global-search-item-count">123 results</span> */}
                </div>
            </Optioner>
        );
    }


    const handleSearch = value => {
        setSearchTitle(value);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            handleSubmit(value)
        }, 2000);
    };
    console.log(searchTitle)
    return (
        <div id="topsearch">
            <div className="search-part">
                <InputGroup size="large" compact>
                    <AutoComplete
                        className="global-search"
                        size="large"
                        style={{ width: '70%' }}
                        dataSource={dataSource.map(renderOption, searchTitle)}
                        onSelect={onSelect}
                        onSearch={handleSearch}
                        placeholder="Введите запрос поиска"
                        optionLabelProp="text"
                    >
                        <Input
                            value={searchTitle} /* onChange={handleChange} */ size="large"
                        />
                    </AutoComplete>
                    {/* <Input value={searchTitle} onChange={handleChange} size="large" style={{ width: "70%" }} placeholder="Введите запрос поиска" /> */}
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