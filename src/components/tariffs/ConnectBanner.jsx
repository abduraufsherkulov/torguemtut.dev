import React from 'react';
import { Button, Row, Col } from 'antd';


function ConnectBanner() {
    return (
        <div id="contentbanner">
            <div className="container">
                <Row type="flex" justify="center">
                    <Col span={12} style={{textAlign: 'center'}}>
                        <h1>Развивайте свой бизнес вместе с tt</h1>
                        <p>Тариф «Универсальный» — пакет самых эффективных услуг для массовых и быстрых продаж</p>
                        <Button type="warning">Подключить тариф</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ConnectBanner;