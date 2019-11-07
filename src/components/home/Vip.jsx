import React, { useState } from 'react';
import { Row, Col, Icon, Divider, Button } from 'antd';
import Crown from "../../images/crown.png";
import Watch from "../../images/watch.png";
import HeartIcons from '../Icons/HeartIcons';

function Vip() {

    return (
        <div id="vip">
            <div id="vip-top">
                <div className="container">
                    <div className="vip-title">
                        <img src={Crown} alt="" />
                        <a style={{ visibility: "hidden" }} href="">Как сюда попасть?</a>
                        <h1>VIP объявления</h1>
                        <a href="#">Как сюда попасть?</a>
                    </div>
                </div>
            </div>
            <div className="vip-grid">
                <div className="container">
                    <Row justify="space-between" type="flex" className="mainrows">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index, key) => (
                            <Col key={key} className="each">
                                <div className="img-part">
                                    <a>
                                        <div className="vip-face">
                                            <span>VIP</span>
                                            <HeartIcons />
                                        </div>
                                        <img src={Watch} alt="" />
                                    </a>
                                </div>
                                <div className="info-part">
                                    <h1>{index * 10} y.e.</h1>
                                    <p>Smart Watch A1 Black</p>
                                </div>
                            </Col>
                        ))}
                        <Divider><Button loading>Показать еще</Button></Divider>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Vip;