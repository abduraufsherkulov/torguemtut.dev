import React, { useState, useContext } from 'react';
import { Row, Col, Divider, Button, Pagination } from 'antd';
import Watch from "../../../images/watch.png";
import EditIcons from '../../Icons/EditIcons';
import DeleteIcons from '../../Icons/DeleteIcons';
import ViewIcons from '../../Icons/ViewIcons';
import { WishlistContext } from '../../../contexts/WishlistContext';

function SelectedWishes() {
    const { wishlist, pagination, currentPage, setCurrentPage, pageSize } = useContext(WishlistContext);

    const handlePage = (page) => {
        setCurrentPage(page)
    }
    return (
        <div id="activeads">
            <div className="activeads-grid">
                <div className="container">
                    <Row className="mainrows">
                        {wishlist.map((index, key) => (
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
                                            <img src={index.images !== undefined ? `https://tt.delivera.uz/Resources/Images/${index.images[0].path}` : null} alt="" />
                                        </div>
                                    </a>
                                </div>
                                <div className="info-part">
                                    <h1>{index.price.amount} {index.price.currencyLabel}</h1>
                                    <p>{index.title}</p>
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

export default SelectedWishes
