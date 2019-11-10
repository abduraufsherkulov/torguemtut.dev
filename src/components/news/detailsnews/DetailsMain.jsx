import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import DetailsCarousel from './DetailsCarousel';
import DetailsInfoSeller from './DetailsInfoSeller';
import DetailsInfoProduct from './DetailsInfoProduct';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios'

function DetailsMain() {
    const { userData } = useContext(AuthContext)
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
                dispatcher({ type: 'SIGN_IN' })
            }
                console.log(error.response, "error in categories");
            });
    }, []);
    return (
        <div className="container">
            <div id="newsdetails">
                <Row type="flex" gutter={24}>
                    <Col span={18}>
                        <DetailsCarousel listData={listData[0].images} />
                        <DetailsInfoProduct listData={listData[0]} />
                    </Col>
                    <Col span={6}><DetailsInfoSeller listData={listData[0]} /></Col>
                </Row>
            </div>
        </div>
    )
}

export default DetailsMain
