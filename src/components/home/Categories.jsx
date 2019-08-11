import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import Img from "../../images/property.png";

const { Title } = Typography;

function Categories() {
    return (
        <div id="categories">
            <Row>
                <Col span={6} className="padding-bottom">
                    <div className="d-flex-vertical">
                        <div className="d-inline-block"><img src={Img} /></div>
                        <Title className="d-inline-block"><a>Недвижимость</a></Title>
                    </div>
                    <div className="sub-categories">
                        <ul>
                            <li>
                                <Title level={2}><a>Квартиры</a><span>32 216</span></Title>
                                <ul>
                                    <li><Title level={2}><a>Аренда долгосрочная</a><span>12 233</span></Title></li>
                                    <li><Title level={2}><a>Аренда долгосрочная</a><span>12 233</span></Title></li>
                                    <li><Title level={2}><a>Аренда долгосрочная</a><span>12 233</span></Title></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Categories;