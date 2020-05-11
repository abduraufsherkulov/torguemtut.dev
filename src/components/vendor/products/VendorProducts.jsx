import React, { useState, useEffect, useContext } from "react";
import ComingSoon from "../../../images/coming_soon.gif";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { Row, Col, Skeleton, Card } from "antd";
import { Link } from "react-router-dom";
import HeartIcons from "../../Icons/HeartIcons";

const { Meta } = Card;

function VendorProducts({ id }) {
    const { userData, dispatch } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [listData, setListData] = useState([
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
    ]);
    useEffect(() => {
        const data = JSON.stringify({
            ownerId: id,
        });
        const endpoint = `https://tt.delivera.uz/api/news/get-all`;
        axios({
            method: "post",
            url: endpoint,
            data: data,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then((response) => {
                console.log(response.data);
                setListData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status == 401) {
                    message.info("Сессия истекла", 2);
                    dispatch({ type: "SIGN_IN" });
                }
                console.log(error.response, "error in categories");
            });
    }, []);
    return (
        <div id="activeads">
            <div className="activeads-grid">
                <div className="container">
                    <Row className="mainrows">
                        {listData.map((item, index) => {
                            if (item.id == undefined) {
                                return (
                                    <Col span={6} key={index} className="each">
                                        <Card
                                            hoverable
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
                                    </Col>
                                );
                            } else {
                                return (
                                    <Col
                                        style={{
                                            border:
                                                item.tariffs &&
                                                item.tariffs.find(
                                                    (x) => x.type == 2
                                                )
                                                    ? "1px solid #543f92"
                                                    : "1px solid #ebebeb",
                                        }}
                                        span={6}
                                        key={index}
                                        className="each"
                                    >
                                        <div className="img-part">
                                            <div className="activeads-face">
                                                <Link
                                                    to={`/item/${item.id}`}
                                                ></Link>
                                            </div>
                                            <div className="activeads-links">
                                                {item.tariffs &&
                                                item.tariffs.find(
                                                    (x) => x.type == 1
                                                ) ? (
                                                    <i className="spanner">
                                                        VIP
                                                    </i>
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
                                                        item.images !==
                                                        undefined
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
                                            <p title={item.title}>
                                                {item.title}
                                            </p>
                                        </div>
                                    </Col>
                                );
                            }
                        })}
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default VendorProducts;
