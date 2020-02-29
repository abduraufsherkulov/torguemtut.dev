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
                        {perItem.map((index, key) => (
                            <Col span={6} key={key} className="each">
                                <div className="img-part">
                                    <Link to={`myads/${index.id}`}>
                                        <div className="activeads-face">
                                            <i className="spanner">VIP</i>
                                            <div className="action-block">
                                                <ViewIcons />
                                                <EditIcons />
                                                <DeleteIcons />
                                            </div>
                                        </div>
                                        <div className="img-item-container">
                                            <img src={index.images !== undefined ? `https://ttuz.azurewebsites.net/Resources/Images/${index.images[0].path}` : null} alt="" />
                                        </div>
                                    </Link>
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

export default Active
