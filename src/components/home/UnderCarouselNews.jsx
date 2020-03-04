import React, { useEffect, useState, useContext } from 'react'
import { Carousel, Row, Col } from 'antd';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios'
import { Link } from 'react-router-dom';
function UnderCarouselNews() {
    const { userData, dispatch } = useContext(AuthContext)
    const [vip, setVip] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/news/get-all-by-tariff";
        const data = JSON.stringify({
            Type: 3,
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
                setLoading(false)
                console.log(response.data, 'called wanted')
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
        <div className="down-promotion">
            <Row type="flex" gutter={[8, 8]} justify="space-between">
                {!loading && vip.map((item, index) => (
                    <Col span={6} key={index}>
                        <Link to={`/item/${item.id}`}>
                            <div className="crowd-container">
                                <div className="crowd-img">
                                    <img style={{ width: '100%' }} src={item.images !== undefined ? `https://ttuz.azurewebsites.net/Resources/Images/${item.images[0].path}` : null} alt="" />
                                    {/* <img src="//ae01.alicdn.com/kf/H44270036a201444eaff9af72aaf84556z.jpg_140x140.jpg_.webp" /> */}
                                </div>
                                <div className="crowd-note">
                                    <div className="crowd-price">{item.price.amount} sum</div>
                                </div>
                                <div className="crowd-title" title={item.title}>{item.title}</div>
                            </div>
                        </Link>
                    </Col>
                ))
                }
            </Row >
        </div >
    )
}

export default UnderCarouselNews
