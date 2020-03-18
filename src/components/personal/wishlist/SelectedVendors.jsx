import React, { useState, useContext } from 'react';
import { Row, Col, Icon, Divider, Button, Avatar, Pagination } from 'antd';
import Watch from "../../../images/watch.png";
import EditIcons from '../../Icons/EditIcons';
import DeleteIcons from '../../Icons/DeleteIcons';
import ViewIcons from '../../Icons/ViewIcons';
import { WishlistContext } from '../../../contexts/WishlistContext';
import { WishlistVendorContext } from '../../../contexts/WishlistVendorContext';

function SelectedVendors() {
    const { wishlistvendor, pagination, currentPage, setCurrentPage, pageSize } = useContext(WishlistVendorContext);
    const handlePage = (page) => {
        setCurrentPage(page)
    }
    return (
        <div id="activeads">
            <div className="activeads-grid">
                <div className="container">
                    <Row className="mainrows">
                        {wishlistvendor.map((index, key) => (
                            <Col span={6} key={key} className="each">
                                <div className="img-part">
                                    <a href="">
                                        <div className="activeads-face">
                                            <i className="spanner">VIP</i>
                                            <div className="action-block">
                                                <ViewIcons />
                                                <EditIcons />
                                                <DeleteIcons />
                                            </div>
                                        </div>
                                        <div className="img-item-container">
                                            <Avatar shape="square" size={"100%"} icon="user" />
                                        </div>
                                    </a>
                                </div>
                                <div className="info-part">
                                    <h1>{index.fullName}</h1>
                                    <p>{index.phone}</p>
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

export default SelectedVendors
