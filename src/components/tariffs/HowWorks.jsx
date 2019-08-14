import React from 'react'
import { Divider, Col, Row, Button } from 'antd';
import Topup from "../../images/topup.png";
import Topad from "../../images/topad.png";
import Vipad from "../../images/vipad.png";

function HowWorks() {
    return (
        <div id="howworks">
            <div className="top-up">
                <div className="title">
                    <h1>Как работают платные услуги?</h1>
                </div>
                <div className="container">
                    <Row type="flex" align="middle">
                        <Col span={14}>
                            <div className="img-side">
                                <img src={Topup} alt="" />
                            </div>
                        </Col>
                        <Col span={10}>
                            <div className="text-side">
                                <h2>Поднятие</h2>
                                <p>Объявления показываются на первых местах в результатах поиска, более заметны за счет большой карточки. Привлекают максимум внимания аудитории!</p>
                                <Button type="primary">Подключить услугу</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="top-ad">
                <div className="container">
                    <Row type="flex" align="middle">
                        <Col span={12}>
                            <div className="text-side">
                                <h2>Топ объявление</h2>
                                <p>Объявление показывается в результатах поиска в приоритетном порядке над платными объявлениям, сортируются по возрастанию цены.</p>
                                <Button type="primary">Подключить услугу</Button>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="img-side">
                                <img src={Topad} alt="" />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="vip-ad">
                <div className="container">
                    <Row type="flex" align="middle">
                        <Col span={14}>
                            <div className="img-side">
                                <img src={Vipad} alt="" />
                            </div>
                        </Col>
                        <Col span={10}>
                            <div className="text-side">
                                <h2>VIP-объявление</h2>
                                <p>На главной странице размещаются все объявления, которые рекламируются с помощью тарифа "Премиум", но благодаря тому, что нашу площадку посещают тысяча пользователей, ваше предложение получит в 10 раз больше откликов, чем объявление без рекламы.</p>
                                <Button type="primary">Подключить услугу</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default HowWorks
