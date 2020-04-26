import React, { useState, useContext } from "react";
import { Row, Col, Divider, Button, Pagination } from "antd";
import Watch from "../../../images/watch.png";
import EditIcons from "../../Icons/EditIcons";
import DeleteIcons from "../../Icons/DeleteIcons";
import ViewIcons from "../../Icons/ViewIcons";
import { Link } from "react-router-dom";
import { AdsArchiveContext } from "../../../contexts/AdsArchiveContext";
import { AdsActiveContext } from "../../../contexts/AdsActiveContext";
import RestoreIcons from "../../Icons/RestoreIcons";
import { AdsWaitingContext } from "../../../contexts/AdsWaitingContext";

function Archive() {
    const {
        waitingAds,
        setWaitingAds,
        pagination,
        currentPage,
        setCurrentPage,
        pageSize,
        pagination: waitingPagination,
        setPagination: setWaitingPagination,
    } = useContext(AdsWaitingContext);
    const {
        archiveAds,
        setArchiveAds,
        pagination: archivePagination,
        setPagination: setArchivePagination,
    } = useContext(AdsArchiveContext);
    const handlePage = (page) => {
        setCurrentPage(page);
    };
    return (
        <div id="activeads">
            <div className="activeads-grid">
                <div className="container">
                    <Row className="mainrows">
                        {archiveAds.map((item, index) => (
                            <Col span={6} key={index} className="each">
                                <div className="img-part">
                                    <div className="activeads-face">
                                        <Link to={`myads/${item.id}`}></Link>
                                    </div>
                                    <div className="activeads-links">
                                        <i className="spanner">VIP</i>

                                        <DeleteIcons
                                        // fromAds={activeAds}
                                        // fromSetAds={setActiveAds}
                                        // fromPagination={activePagination}
                                        // fromSetPagination={
                                        //     setActivePagination
                                        // }
                                        // toAds={archiveAds}
                                        // toSetAds={setArchiveAds}
                                        // toPagination={archivePagination}
                                        // toSetPagination={
                                        //     setArchivePagination
                                        // }
                                        // perItem={item}
                                        />
                                        <RestoreIcons
                                            fromAds={archiveAds}
                                            fromSetAds={setArchiveAds}
                                            fromPagination={archivePagination}
                                            fromSetPagination={
                                                setArchivePagination
                                            }
                                            toAds={waitingAds}
                                            toSetAds={setWaitingAds}
                                            toPagination={waitingPagination}
                                            toSetPagination={
                                                setWaitingPagination
                                            }
                                            toStatus={1}
                                            perItem={item}
                                        />
                                    </div>
                                    <div className="img-item-container">
                                        <img
                                            src={
                                                item.images !== undefined
                                                    ? `https://tt.delivera.uz/Resources/Images/${item.images[0].path}`
                                                    : null
                                            }
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="info-part">
                                    <h1>
                                        {item.price.amount}{" "}
                                        {item.price.currencyLabel}
                                    </h1>
                                    <p title={item.title}>{item.title}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <Pagination
                        current={currentPage}
                        total={pagination.TotalCount}
                        onChange={handlePage}
                        pageSize={pageSize}
                    />
                </div>
            </div>
        </div>
    );
}

export default Archive;
