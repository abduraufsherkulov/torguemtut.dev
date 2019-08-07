import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import Img from "../../images/property.png";

const { Title } = Typography;

function Categories() {
    return (
        <div>
            <Row>
                <Col span={6}>
                    <div>
                        <div className="d-inline-block"><img src={Img} /></div>
                        <Title className="d-inline-block">Недвижимость</Title>
                    </div>
                </Col>

                <Col span={6}>col-12</Col>
                <Col span={6}>col-12</Col>
                <Col span={6}>col-12</Col>
            </Row>
        </div>
    )
}

export default Categories;