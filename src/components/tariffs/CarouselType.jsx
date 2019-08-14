import React from 'react'
import { Row, Col, Button, Divider } from 'antd';
import Advday from "../../images/advday.png";
import Up from "../../images/up.png";
import Vip from "../../images/vip-gold.png";

function CarouselType() {
    return (
        <div id="carouseltype">
            <div className="container">
                <h1 className="title">Тарифы</h1>
                <Row gutter={48}>
                    <Col span={8}>
                        <div className="tariff-info one">
                            <div className="tariff-title">
                                <p>тариф</p>
                                <h2>Базовый</h2>
                            </div>
                            <div className="tariff-rest">
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Advday} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>Топ объявление на 7 дней</h1>
                                    </div>
                                </div>
                                <Divider />
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Up} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>Поднятие в верх списка</h1>
                                    </div>
                                </div>
                                <Divider />
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Vip} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>VIP-объявление</h1>
                                    </div>
                                </div>
                                <div className="tariff-btn">
                                    <Button type="primary">Подключить тариф</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="tariff-info two">
                            <div className="tariff-title">
                                <p>тариф</p>
                                <h2>Базовый</h2>
                            </div>
                            <div className="tariff-rest">
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Advday} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>Топ объявление на 7 дней</h1>
                                    </div>
                                </div>
                                <Divider />
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Up} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>Поднятие в верх списка</h1>
                                    </div>
                                </div>
                                <Divider />
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Vip} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>VIP-объявление</h1>
                                    </div>
                                </div>
                                <div className="tariff-btn">
                                    <Button type="success">Подключить тариф</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="tariff-info three">
                            <div className="tariff-title">
                                <p>тариф</p>
                                <h2>Базовый</h2>
                            </div>
                            <div className="tariff-rest">
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Advday} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>Топ объявление на 7 дней</h1>
                                    </div>
                                </div>
                                <Divider />
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Up} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>Поднятие в верх списка</h1>
                                    </div>
                                </div>
                                <Divider />
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Vip} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>VIP-объявление</h1>
                                    </div>
                                </div>
                                <div className="tariff-btn">
                                    <Button type="warning">Подключить тариф</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default CarouselType
