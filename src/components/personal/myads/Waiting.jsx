import React, { useState, useContext } from 'react';
import { Row, Col, Divider, Button, Pagination } from 'antd';
import Watch from "../../../images/watch.png";
import EditIcons from '../../Icons/EditIcons';
import DeleteIcons from '../../Icons/DeleteIcons';
import ViewIcons from '../../Icons/ViewIcons';
import { Link } from 'react-router-dom'
import { AdsWaitingContext } from '../../../contexts/AdsWaitingContext';

function Waiting() {
    const { waitingAds, pagination, currentPage, setCurrentPage, pageSize } = useContext(AdsWaitingContext)
    const handlePage = (page) => {
        setCurrentPage(page)
    }
    return (
        <div id="activeads">
            <div className="activeads-grid">
                <div className="container">
                    <Row className="mainrows">
                        {waitingAds.map((item, index) => (
                            <Col span={6} key={index} className="each">
                                <div className="img-part">
                                    <div className="activeads-face">
                                        {/* <i className="spanner">VIP</i> */}
                                        <div className="action-block">
                                            {/* <ViewIcons />
                                            <EditIcons />
                                            <DeleteIcons /> */}
                                        </div>
                                    </div>
                                    <div className="img-item-container">
                                        <img src={item.images !== undefined ? `https://tt.delivera.uz/Resources/Images/${item.images[0].path}` : null} alt="" />
                                    </div>
                                </div>
                                <div className="info-part">
                                    <h1>{item.price.amount} {item.price.currencyLabel}</h1>
                                    <p title={item.title}>{item.title}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <Pagination current={currentPage} total={pagination.TotalCount} onChange={handlePage} pageSize={pageSize} />
                </div>
            </div>
        </div>
    )
}

export default Waiting
