import React from 'react'
import { Row, Col } from 'antd';
import DetailsCarousel from './DetailsCarousel';

function DetailsMain() {
    return (
        <div className="container">
            <div id="newsdetails">
                <Row type="flex" align="middle" justify="center" gutter={24}>
                    <Col span={12}><DetailsCarousel /></Col>

                </Row>
            </div>
        </div>
    )
}

export default DetailsMain
