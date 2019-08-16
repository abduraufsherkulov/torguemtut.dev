import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Typography, Card } from 'antd';
import Img from "../../images/property.png";
import axios from 'axios';

const { Title } = Typography;

function Subsubcategories(props) {
    return (
        <li><a>{props.subsubcat.name}</a><span>{props.subsubcat.sort}</span></li>
    )
}


function Subcategories(props) {
    const subref = useRef(null);
    const [active, setActive] = useState(false);
    function _togle() {
        setActive(!active);
    }
    return (
        <li>
            <a className={active ? "active" : ""} onClick={_togle}>{props.subcat.name}</a><span>{props.subcat.sort}</span>
            <ul style={{ maxHeight: active ? subref.current.scrollHeight : 0 }} ref={subref} className="sub-sub-categories">
                {props.all.map((subsubcat, index) => {
                    if (props.subcat.id === subsubcat.parentId) {
                        return (
                            <Subsubcategories subsubcat={subsubcat} key={index} />
                        )
                    }
                })}
            </ul>
        </li>
    )
}


function Categories() {
    const [category, setCategory] = useState([]);



    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/category";
        axios({
            method: "get",
            url: endpoint,
            //   auth: {
            //     username: "delivera",
            //     password: "X19WkHHupFJBPsMRPCJwTbv09yCD50E2"
            //   },
            //   headers: {
            //     "content-type": "application/json",
            //     token: token
            //   }
        })
            .then(response => {
                // console.log(response.data);
                setCategory(response.data);
            })
            .catch(error => {
                console.log(error, "error in categories");
            });

    }, []);

    return (
        <div id="categories">
            <Row>
                {category.map((cat, index) => {
                    if (cat.parentId == null && index < 49) {
                        return (
                            <Col key={index} span={6} className="padding-bottom">
                                <div className="d-flex-vertical parent-category">
                                    <div className="d-inline-block"><img src={Img} /></div>
                                    <a>{cat.name}</a>
                                </div>
                                <div className="sub-categories">
                                    <ul>
                                        {category.map((subcat, i) => {
                                            if (subcat.parentId === cat.id) {
                                                return (
                                                    <Subcategories all={category} subcat={subcat} key={i} />
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            </Col>
                        )
                    }
                })}
            </Row>
        </div >
    )
}


export default Categories;