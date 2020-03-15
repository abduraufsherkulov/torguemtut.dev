import React, { useContext, useState } from 'react'
import { Row, Col, Button, Divider, Tag, message } from 'antd';
import Advday from "../../../images/advday.png";
import Up from "../../../images/up.png";
import Vip from "../../../images/vip-gold.png";
import { BalanceContext } from '../../../contexts/BalanceContext';
import { AuthContext } from '../../../contexts/AuthContext';
import { useParams, withRouter } from 'react-router-dom'
import axios from 'axios'

function BoostCarouselType(props) {
    const { balance } = useContext(BalanceContext);
    const { userData, dispatch } = useContext(AuthContext);
    const [loading, setLoading] = useState({ id: 0, status: false });
    let { id } = useParams();

    const endpoint = "https://tt.delivera.uz/api/news/post-tariff";

    const handleHome = () => {
        setLoading({ id: 1, status: true });
        const data = JSON.stringify({
            NewsId: id,
            Type: 1
        })
        axios({
            method: 'post',
            url: endpoint,
            data: data,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            if (response.data.status) {
                setLoading({ id: 1, status: false });
                props.history.push('/myads');
            }
        }).catch(error => {
            if (error.response.status == 401) {
                message.info('Сессия истекла', 2);
                dispatch({ type: 'SIGN_IN' })
            }
            console.log(error.response)
        })
    }

    const handleVip = () => {

        const data = JSON.stringify({
            NewsId: id,
            Type: 2
        })
        axios({
            method: 'post',
            url: endpoint,
            data: data,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            if (response.data.status) {
                setLoading({ id: 2, status: false });
                props.history.push('/myads');
            }

        }).catch(error => {
            if (error.response.status == 401) {
                message.info('Сессия истекла', 2);
                dispatch({ type: 'SIGN_IN' })
            }
            console.log(error.response)
        })
    }

    const handleHighlight = () => {

        const data = JSON.stringify({
            NewsId: id,
            Type: 3
        })
        axios({
            method: 'post',
            url: endpoint,
            data: data,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            if (response.data.status) {
                setLoading({ id: 3, status: false });
                props.history.push('/myads');
            }
        }).catch(error => {
            if (error.response.status == 401) {
                message.info('Сессия истекла', 2);
                dispatch({ type: 'SIGN_IN' })
            }
            console.log(error.response)
        })
    }

    return (
        <div id="boostcarouseltype">
            <div className="container">
                <h1 style={{ textAlign: 'right' }}>Ваш счет: <Tag color="green">{balance} Сум</Tag></h1>
                <h1 className="title">Тарифы</h1>
                <Row gutter={48}>
                    <Col span={8}>
                        <div className="tariff-info one">
                            <div className="tariff-title">
                                <p>тариф</p>
                                <h2>Объявления на главной</h2>
                            </div>
                            <div className="tariff-rest">
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Advday} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>Топ объявление на 7 дней</h1>
                                    </div>
                                </div>
                                <Divider />
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Up} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>Поднятие в верх списка</h1>
                                    </div>
                                </div>
                                <Divider />
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Vip} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>VIP-объявление</h1>
                                    </div>
                                </div>
                                <div className="tariff-btn">
                                    <Button loading={loading.id == 1 ? loading.status : false} disabled={loading.id == 1 ? false : loading.status} onClick={handleHome} type="primary">Подключить тариф</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="tariff-info two">
                            <div className="tariff-title">
                                <p>тариф</p>
                                <h2>Вип объявления</h2>
                            </div>
                            <div className="tariff-rest">
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Advday} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>Топ объявление на 7 дней</h1>
                                    </div>
                                </div>
                                <Divider />
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Up} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>Поднятие в верх списка</h1>
                                    </div>
                                </div>
                                <Divider />
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Vip} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>VIP-объявление</h1>
                                    </div>
                                </div>
                                <div className="tariff-btn">
                                    <Button loading={loading.id == 2 ? loading.status : false} disabled={loading.id == 2 ? false : loading.status} onClick={handleVip} type="success">Подключить тариф</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="tariff-info three">
                            <div className="tariff-title">
                                <p>тариф</p>
                                <h2>Выделение объявления</h2>
                            </div>
                            <div className="tariff-rest">
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Advday} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>Топ объявление на 7 дней</h1>
                                    </div>
                                </div>
                                <Divider />
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Up} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>Поднятие в верх списка</h1>
                                    </div>
                                </div>
                                <Divider />
                                <div className="first d-flex-vertical">
                                    <div className="img-part">
                                        <img src={Vip} alt="" />
                                    </div>
                                    <div className="info-part">
                                        <h1>VIP-объявление</h1>
                                    </div>
                                </div>
                                <div className="tariff-btn">
                                    <Button loading={loading.id == 3 ? loading.status : false} disabled={loading.id == 3 ? false : loading.status} onClick={handleHighlight} type="warning">Подключить тариф</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default withRouter(BoostCarouselType)
