import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Row, Col, message } from 'antd';
import axios from 'axios'
import MyAdsInfoProduct from './MyAdsInfoProduct';
import MyAdsCarousel from './MyAdsCarousel';
import { AuthContext } from '../../../../contexts/AuthContext';

function MyAdsInfoMain() {
    const { userData, dispatch } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [listData, setListData] = useState([{}, {}]);

    let { id } = useParams();

    useEffect(() => {
        const data = JSON.stringify({
            id: id
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
                if (error.response.status == 401) {
                    message.info('Сессия истекла', 2);
                    dispatch({ type: 'SIGN_IN' })
                }
                console.log(error.response, "error in categories");
            });
    }, []);

    return (
        <div className="container">
            <div id="newsdetails">
                <Row type="flex" gutter={24}>
                    <Col span={24}>
                        <MyAdsCarousel />
                        <MyAdsInfoProduct listData={listData[0]} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default MyAdsInfoMain
