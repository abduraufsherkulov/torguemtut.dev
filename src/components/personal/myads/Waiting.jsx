import React, { useState, useContext } from 'react';
import { Row, Col, Icon, Divider, Button } from 'antd';
import Watch from "../../../images/watch.png";
import EditIcons from '../../Icons/EditIcons';
import DeleteIcons from '../../Icons/DeleteIcons';
import ViewIcons from '../../Icons/ViewIcons';
import { MyAdsContext } from '../../../contexts/MyAdsContext';

function Waiting() {
    const { myAds } = useContext(MyAdsContext);
    const perItem = myAds.filter(item => item.status == 1);
    console.log(myAds);
    return (
        <div id="activeads">
            <div className="activeads-grid">
                <div className="container">
                    <Row className="mainrows">
                        {perItem.map((index, key) => (
                            <Col span={6} key={key} className="each">
                                <div className="img-part">
                                    <a href="">
                                        <div className="activeads-face">
                                            <span>VIP</span>
                                            <div className="action-block">
                                                <ViewIcons />
                                                <EditIcons />
                                                <DeleteIcons />
                                            </div>
                                        </div>
                                        <div className="img-item-container">
                                            <img src={index.images !== undefined ? `https://ttuz.azurewebsites.net/${index.images[0].path}` : null} alt="" />
                                        </div>
                                    </a>
                                </div>
                                <div className="info-part">
                                    <h1>{index.price.amount} {index.price.currencyLabel}</h1>
                                    <p title={index.title}>{index.title}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Waiting
