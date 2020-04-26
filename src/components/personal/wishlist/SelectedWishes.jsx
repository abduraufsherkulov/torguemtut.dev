import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Divider, Button, Pagination } from "antd";
import Watch from "../../../images/watch.png";
import EditIcons from "../../Icons/EditIcons";
import DeleteIcons from "../../Icons/DeleteIcons";
import ViewIcons from "../../Icons/ViewIcons";
import { WishlistContext } from "../../../contexts/WishlistContext";
import HeartIcons from "../../Icons/HeartIcons";

function SelectedWishes() {
    const {
        wishlist,
        pagination,
        currentPage,
        setCurrentPage,
        pageSize,
    } = useContext(WishlistContext);
    const [selectedWishes, setSelectedWishes] = useState([]);
    const handlePage = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        setSelectedWishes([...wishlist]);
    }, [wishlist]);
    console.log(selectedWishes);
    return (
        <div id="activeads">
            <div className="activeads-grid">
                <div className="container">
                    <Row className="mainrows">
                        {wishlist.map((item, index) => (
                            <Col span={6} key={index} className="each">
                                <div className="img-part">
                                    <div className="activeads-face">
                                        <Link to={`myads/${item.id}`}></Link>
                                    </div>
                                    <div className="activeads-links">
                                        <i className="spanner">VIP</i>
                                        <HeartIcons
                                            setListData={setSelectedWishes}
                                            listData={selectedWishes}
                                            item={item}
                                            favourite={item.favourite}
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
                                    <p>{item.title}</p>
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

export default SelectedWishes;
