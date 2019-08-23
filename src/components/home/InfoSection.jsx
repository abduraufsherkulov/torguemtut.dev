import React from 'react'
import { Col, Row } from 'antd';
import VendorsUzb from "../../images/vendors_uzb.png";
import BuyAll from "../../images/buy_all.png";
import ClientProtection from "../../images/client_protection.png";

function InfoSection() {
    return (
        <div id="infosection">
            <div className="container">
                <Row type="flex" gutter={48} type="flex" justify='space-around'>
                    <Col span={7}>
                        <div className="img-container">
                            <img src={VendorsUzb} alt="" />
                        </div>
                        <h1>Продавцы со всего Узбекистана</h1>
                        <p>Мы работаем по территории всего Узбекистана</p>
                    </Col>
                    <Col span={7}>
                        <div className="img-container">
                            <img src={BuyAll} alt="" />
                        </div>
                        <h1>Можно купить все</h1>
                        <p>323 655 товаров и услуг в настоящее время</p>
                    </Col>
                    <Col span={7}>
                        <div className="img-container">
                            <img src={ClientProtection} alt="" />
                        </div>
                        <h1>Защита покупателей</h1>
                        <p>Каждое объявление проходит ручную модерацию</p>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default InfoSection;