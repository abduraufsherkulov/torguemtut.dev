import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Divider, Button, Card, Skeleton } from 'antd';
import Crown from "../../images/crown.png";
import HeartIcons from '../Icons/HeartIcons';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';

const { Meta } = Card;

function Vip() {
    const { userData, dispatch } = useContext(AuthContext)
    const [vip, setVip] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/news/get-all-by-tariff";

        const data = JSON.stringify({
            Type: 1,
            pageSize: 30,
            // pageNumber: currentPage
        })

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
                setVip(response.data)
                console.log(response)
            })
            .catch(error => {
                if (error.response.status == 401) {
                    message.info('Сессия истекла', 2);
                    dispatch({ type: 'SIGN_IN' })
                }
                console.log(error, "error in categories");
            });
    }, [])
    return (
        <div id="vip">
            <div id="vip-top">
                <div className="container">
                    <div className="vip-title">
                        <img src={Crown} alt="" />
                        <a style={{ visibility: "hidden" }} href="">Как сюда попасть?</a>
                        <h1>VIP объявления</h1>
                        <a href="#">Как сюда попасть?</a>
                    </div>
                </div>
            </div>
            <div className="vip-grid">
                <div className="container">
                    <Row justify="space-between" type="flex" className="mainrows">
                        {vip.map((index, key) => {
                            if (index.id == undefined) {
                                return (
                                    <Card
                                        key={key}
                                        hoverable
                                        style={{ width: "19%" }}
                                        cover={<span className="vip-head-loading" style={{ width: "100%", height: "205px" }} alt="example" ></span>}
                                    >
                                        <Skeleton loading={true} paragraph={{ width: '100%', rows: 2 }} title={false}>
                                            <Meta title="Europe Street beat" description="www.instagram.com" />
                                        </Skeleton>
                                    </Card>
                                )
                            } else {
                                return (
                                    <Col style={{ width: '19%' }} key={key} className="each">
                                        <div className="img-part">
                                            <div className="vip-face">
                                                <Link to={`/item/${index.id}`}>
                                                </Link>
                                            </div>
                                            <div className="vip-links">
                                                <i className="spanner">VIP</i>
                                                <HeartIcons setListData={setVip} listData={vip} item={index} favourite={index.favourite} />
                                            </div>
                                            <div className="img-item-container">
                                                <img src={index.images !== undefined ? `https://ttuz.azurewebsites.net/Resources/Images/${index.images[0].path}` : null} alt="" />
                                            </div>
                                        </div>
                                        <div className="info-part">
                                            <h1>{index.price.amount} {index.price.currencyLabel}</h1>
                                            <p>{index.title}</p>
                                        </div>
                                    </Col>
                                )
                            }
                        })}
                        <Divider><Button>Посмотреть все</Button></Divider>

                    </Row>

                </div>
            </div>
        </div >
    )
}

export default Vip;