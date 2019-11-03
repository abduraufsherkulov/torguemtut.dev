import React, { useState } from 'react';
import { Row, Col, Icon, Divider, Button } from 'antd';
import Watch from "../../../images/watch.png";
import EditIcons from '../../Icons/EditIcons';
import DeleteIcons from '../../Icons/DeleteIcons';
import ViewIcons from '../../Icons/ViewIcons';

function Active() {
    return (
        <div id="activeads">
            <div className="activeads-grid">
                <div className="container">
                    <Row justify="space-between" type="flex" className="mainrows">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((index, key) => (
                            <Col key={key} className="each">
                                <div className="img-part"><a href="">
                                    <div className="activeads-face">
                                        <span>VIP</span>
                                        <div className="action-block">
                                            <ViewIcons />
                                            <EditIcons />
                                            <DeleteIcons />
                                        </div>
                                    </div>
                                    <img src={Watch} alt="" /></a>
                                </div>
                                <div className="info-part">
                                    <h1>{index * 10} y.e.</h1>
                                    <p>Smart Watch A1 Black</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Active
