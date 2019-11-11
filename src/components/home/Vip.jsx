import React, { useState, useEffect } from 'react';
import { Row, Col, Icon, Divider, Button } from 'antd';
import Crown from "../../images/crown.png";
import Watch from "../../images/watch.png";
import HeartIcons from '../Icons/HeartIcons';
import axios from 'axios'
import { Link } from 'react-router-dom'

function Vip() {
    const [vip, setVip] = useState([]);
    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/news/get-all-by-tariff?type=1";
        axios({
            method: "post",
            url: endpoint,
            headers: {
                "content-type": "application/json"
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
                        {vip.map((index, key) => (
                            <Col style={{ width: '19%' }} key={key} className="each">
                                <div className="img-part">
                                    <Link to={`/item/${index.id}`}>
                                        <div className="vip-face">
                                            <span>VIP</span>
                                            <HeartIcons setListData={setVip} listData={vip} item={index} favourite={index.favourite} />
                                        </div>
                                        <div className="img-item-container">
                                            <img src={index.images !== undefined ? `https://ttuz.azurewebsites.net/${index.images[0].path}` : null} alt="" />

                                        </div>
                                    </Link>
                                </div>
                                <div className="info-part">
                                    <h1>{index.price.amount} y.e.</h1>
                                    <p>{index.title}</p>
                                </div>
                            </Col>
                        ))}
                        <Divider><Button loading>Показать еще</Button></Divider>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Vip;