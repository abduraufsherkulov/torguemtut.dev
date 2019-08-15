import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Typography, Card } from 'antd';
import Img from "../../images/property.png";
import Subcategories from './Subcategories';
import axios from 'axios';

const { Title } = Typography;

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
            console.log(response);
          })
          .catch(error => {
            console.log(error, "error in orders refresh");
          });

    }, []);

    

    return (
        <div id="categories">
            <Row>
                {category.map((cat, index) => (
                    <React.Fragment>
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
                    </React.Fragment>
                ))}
            </Row>
        </div>
    )
}


export default Categories;