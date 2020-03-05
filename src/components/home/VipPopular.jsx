import React, { useState, useEffect, useContext } from 'react';
import Logo from "../../images/mainlogo.png";
import { Row, Col, Divider, Button, Card, Skeleton } from 'antd';
import HeartIcons from '../Icons/HeartIcons';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';


const { Meta } = Card;

function VipPopular() {
    const { userData, dispatch } = useContext(AuthContext)
    const [vip, setVip] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/news/get-all-by-tariff";

        const data = JSON.stringify({
            Type: 2,
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
            })
            .catch(error => {
                // if (error.response.status == 401) {
                //     message.info('Сессия истекла', 2);
                //     dispatch({ type: 'SIGN_IN' })
                // }
                console.log(error, "error in categories");
            });
    }, [])

    return (
        <div id="top-vendors">
            <div className="top-vendor-top">
                <div className="container">
                    <div className="top-vendor-title">
                        <img src={Logo} alt="" />
                        {/* <a style={{ visibility: "hidden" }} href="">Как сюда попасть?</a> */}
                        <h1>Популярные продацы</h1>
                        <img src={Logo} style={{ visibility: "hidden" }} alt="" />
                    </div>
                </div>
            </div>
            <div className="top-vendor-grid">
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
                                            <div className="top-face">
                                                <Link to={`/item/${index.id}`}>
                                                </Link>
                                            </div>
                                            <div className="top-links">
                                                <i className="spanner">TOP</i>
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
        </div>
    )
}

export default VipPopular;