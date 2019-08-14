import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Typography, Card } from 'antd';
import Img from "../../images/property.png";
import Subcategories from './Subcategories';

const { Title } = Typography;

function Categories() {
    const [category, setCategory] = useState([]);



    useEffect(() => {
        var promise1 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([{
                    category: "Недвижимость",
                    subcategory: [{
                        title: "Квартиры",
                        count: "12 123",
                        subsubcategory: [{
                            title: "Продажа",
                            count: "12 233"
                        }, {
                            title: "Продажа",
                            count: "12 233"
                        }, {
                            title: "Продажа",
                            count: "12 233"
                        }],
                    },{
                        title: "Квартиры",
                        count: "12 123",
                        subsubcategory: [{
                            title: "Продажа",
                            count: "12 233"
                        }, {
                            title: "Продажа",
                            count: "12 233"
                        }, {
                            title: "Продажа",
                            count: "12 233"
                        }],
                    }]
                },
                {
                    category: "Недвижимость",
                    subcategory: [{
                        title: "Квартиры",
                        count: "12 123",
                        subsubcategory: [{
                            title: "Продажа",
                            count: "12 233"
                        }, {
                            title: "Продажа",
                            count: "12 233"
                        }, {
                            title: "Продажа",
                            count: "12 233"
                        }],
                    }]
                },
                {
                    category: "Недвижимость",
                    subcategory: [{
                        title: "Квартиры",
                        count: "12 123",
                        subsubcategory: [{
                            title: "Продажа",
                            count: "12 233"
                        }, {
                            title: "Продажа",
                            count: "12 233"
                        }, {
                            title: "Продажа",
                            count: "12 233"
                        }],
                    }]
                },
                {
                    category: "Недвижимость",
                    subcategory: [{
                        title: "Квартиры",
                        count: "12 123",
                        subsubcategory: [{
                            title: "Продажа",
                            count: "12 233"
                        }, {
                            title: "Продажа",
                            count: "12 233"
                        }, {
                            title: "Продажа",
                            count: "12 233"
                        }],
                    }]
                }]);
            }, 1000);
        });

        promise1.then(function (value) {
            console.log(value);
            setCategory(value);
            // expected output: "foo"
        });

    }, []);

    

    return (
        <div id="categories">
            <Row>
                {category.map((cat, index) => (
                    <Col key={index} span={6} className="padding-bottom">
                        <div className="d-flex-vertical parent-category">
                            <div className="d-inline-block"><img src={Img} /></div>
                            <a>{cat.category}</a>
                        </div>
                        <div className="sub-categories">
                            <ul>
                                {cat.subcategory.map((subcat, index) => (
                                    <Subcategories subcat={subcat} key={index} />
                                ))}
                            </ul>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}


export default Categories;