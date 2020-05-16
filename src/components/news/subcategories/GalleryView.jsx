import React from "react";
import { Row, Col, Divider, Button, Card, Skeleton, Pagination } from "antd";
import { Link, withRouter } from "react-router-dom";
import HeartIcons from "../../Icons/HeartIcons";

function GalleryView({ pagination, listData, catLoading, setListData, setCurrentPage }) {
    const handleChange = (page) => {
        setCurrentPage(page)
    }
    return (
        <div className="gallery-grid">
            <div className="container">
                <Row justify="space-between" type="flex" className="mainrows">
                    {listData.map((item, index) => {
                        if (item.id == undefined) {
                            return (
                                <Card
                                    key={index}
                                    hoverable
                                    style={{ width: "19%" }}
                                    cover={
                                        <span
                                            className="vip-head-loading"
                                            style={{
                                                width: "100%",
                                                height: "205px",
                                            }}
                                            alt="example"
                                        ></span>
                                    }
                                >
                                    <Skeleton
                                        loading={true}
                                        paragraph={{
                                            width: "100%",
                                            rows: 2,
                                        }}
                                        title={false}
                                    >
                                        <Meta
                                            title="Europe Street beat"
                                            description="www.instagram.com"
                                        />
                                    </Skeleton>
                                </Card>
                            );
                        } else {
                            return (
                                <Col
                                    style={{
                                        width: "19%",
                                        border:
                                            item.tariffs &&
                                            item.tariffs.find(
                                                (x) => x.type == 2
                                            )
                                                ? "1px solid #543f92"
                                                : "none",
                                    }}
                                    key={index}
                                    className="each"
                                >
                                    <div className="img-part">
                                        <div className="gallery-face">
                                            <Link
                                                to={`/item/${item.id}`}
                                            ></Link>
                                        </div>

                                        <div className="gallery-links">
                                            {item.tariffs &&
                                            item.tariffs.find(
                                                (x) => x.type == 1
                                            ) ? (
                                                <i className="spanner">VIP</i>
                                            ) : null}
                                            <HeartIcons
                                                setListData={setListData}
                                                listData={listData}
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
                            );
                        }
                    })}
                </Row>
                <Pagination
                    // current={this.state.current}
                    onChange={(page) => {
                        handleChange(page);
                    }}
                    pageSize={30}
                    total={pagination.TotalCount}
                />
            </div>
        </div>
    );
}

export default GalleryView;
