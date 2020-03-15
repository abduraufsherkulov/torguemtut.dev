import React, { useState, useContext } from 'react';
import { Row, Col, Divider, Button } from 'antd';
import Watch from "../../../images/watch.png";
import EditIcons from '../../Icons/EditIcons';
import DeleteIcons from '../../Icons/DeleteIcons';
import ViewIcons from '../../Icons/ViewIcons';
import { MyAdsContext } from '../../../contexts/MyAdsContext';
import { Link } from 'react-router-dom'

function Active() {
    const { myAds } = useContext(MyAdsContext);
    const perItem = myAds.filter(item => item.status == 2);
    return (
        <div id="activeads">
            <div className="activeads-grid">
                <div className="container">
                    <Row className="mainrows">
                        {perItem.map((item, index) => (
                            <Col span={6} key={index} className="each">
                                <div className="img-part">
                                    <Link to={`myads/${item.id}`}>
                                        <div className="activeads-face">
                                            <i className="spanner">VIP</i>
                                            <div className="action-block">
                                                <ViewIcons />
                                                <EditIcons />
                                                <DeleteIcons />
                                            </div>
                                        </div>
                                        <div className="img-item-container">
                                            <img src={item.images !== undefined ? `https://tt.delivera.uz/Resources/Images/${item.images[0].path}` : null} alt="" />
                                        </div>
                                    </Link>
                                </div>
                                <div className="info-part">
                                    <h1>{item.price.amount} {item.price.currencyLabel}</h1>
                                    <p title={item.title}>{item.title}</p>
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
