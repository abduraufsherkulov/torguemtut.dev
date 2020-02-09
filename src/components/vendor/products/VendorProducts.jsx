import React, { useState, useEffect, useContext } from 'react';
import ComingSoon from '../../../images/coming_soon.gif';
import axios from 'axios'
import { AuthContext } from '../../../contexts/AuthContext';
import { Row, Col, Skeleton, Card } from 'antd';
import { Link } from 'react-router-dom'

const { Meta } = Card;

function VendorProducts({ id }) {

    const { userData, dispatch } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [listData, setListData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    useEffect(() => {
        const data = JSON.stringify({
            ownerId: id
        })
        const endpoint = `https://ttuz.azurewebsites.net/api/news/get-all`;
        axios({
            method: "post",
            url: endpoint,
            data: data,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(response => {
                console.log(response.data)
                setListData(response.data);
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                if (error.response.status == 401) {
                    message.info('Сессия истекла', 2);
                    dispatch({ type: 'SIGN_IN' })
                }
                console.log(error.response, "error in categories");
            });
    }, []);
    return (
        <div id="activeads">
            <div className="activeads-grid">
                <div className="container">
                    <Row className="mainrows">
                        {listData.map((index, key) => {
                            if (index.id == undefined) {
                                return (
                                    <Col span={6} key={key} className="each">
                                        <Card
                                            key={key}
                                            hoverable
                                            cover={<span className="vip-head-loading" style={{ width: "100%", height: "205px" }} alt="example" ></span>}
                                        >
                                            <Skeleton loading={true} paragraph={{ width: '100%', rows: 2 }} title={false}>
                                                <Meta title="Europe Street beat" description="www.instagram.com" />
                                            </Skeleton>
                                        </Card>
                                    </Col>
                                )
                            } else {
                                return (
                                    <Col span={6} key={key} className="each">
                                        <div className="img-part">
                                            <Link to={`myads/${index.id}`}>
                                                <div className="activeads-face">
                                                    <span>VIP</span>
                                                    <div className="action-block">
                                                        {/* <ViewIcons />
                            <EditIcons />
                            <DeleteIcons /> */}
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
                                )
                            }
                        })}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default VendorProducts
