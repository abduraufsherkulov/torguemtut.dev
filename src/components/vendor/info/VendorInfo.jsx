import React, { useState, useEffect, useContext } from 'react'
import { Card, Avatar, Skeleton, Button, Rate } from 'antd';
// import GoogleMapsApi from '../adnews/GoogleMapsApi';
import HeartIcons from '../../Icons/HeartIcons';
import VendorHeartIcons from '../../Icons/VendorHeartIcons';
import { Link } from 'react-router-dom'
import GoogleMapsApi from '../../news/adnews/GoogleMapsApi';
import axios from 'axios'
import { AuthContext } from '../../../contexts/AuthContext';
import { PhoneOutlined, UserOutlined } from '@ant-design/icons';

const { Meta } = Card;

function VendorInfo({ id }) {
    const { userData } = useContext(AuthContext)
    const [loading, setLoading] = useState(true);
    const [position, setPosition] = useState({
        RegionId: 1,
        DistrictId: 1,
        Address: "",
        Longtitude: 69.279718,
        Latitude: 41.311157
    })
    const [item, setItem] = useState({});
    useEffect(() => {
        const endpoint = `https://tt.delivera.uz/api/users/get-profile?userId=${id}`;
        axios({
            method: "post",
            url: endpoint,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(response => {
                console.log(response.data, 'vendorinfo')
                setItem(response.data);
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                if (error.response.status == 401 && userData.session == true) {
                    message.info('Сессия истекла', 2);
                    dispatch({ type: 'SESSION_EXPIRED' })
                }
                console.log(error.response, "error in categories");
            });

        // if (item.location !== undefined) {
        //     setLoading(false)
        //     setPosition({
        //         RegionId: 1,
        //         DistrictId: 1,
        //         Address: "",
        //         Longtitude: +item.location.longtitude,
        //         Latitude: +item.location.latitude
        //     })
        // }
    }, [])
    console.log(item)
    return (
        <div>
            {/* <Card>
                <Skeleton paragraph={{ rows: 0, width: "100%" }} loading={loading} active>
                    {!loading && (
                        <>
                            <h2>{item.price.amount} {index.price.currencyLabel}</h2>
                        </>
                    )
                    }
                </Skeleton>
            </Card> */}
            <Skeleton paragraph={{ rows: 0 }} loading={loading} active>
                {!loading && (<Button href={`tel:${item.phone}`} type="primary" block ><PhoneOutlined />{item.phone}</Button>)}
            </Skeleton>
            <Skeleton paragraph={{ rows: 0 }} loading={loading} active>
                {!loading && (
                    <Card
                        style={{ display: 'flex', flexDirection: 'column' }}
                        extra={<VendorHeartIcons single={true} listData={item} setListData={setItem} item={item} vendorFavourite={item.vendorFavourite} />}
                        title={<Meta
                            style={{ display: 'flex', alignItems: 'center' }}
                            avatar={<Avatar size="large" icon={<UserOutlined />} />}
                            title={<Link to={`/vendorproducts/${item.ownerId}`}>{item.phone}</Link>}
                        // description="Джон"
                        />}
                        cover={
                            <GoogleMapsApi style={{ order: 1 }} position={position} defaultZoom={17} />
                        }
                        actions={[
                            <Rate disabled={true} allowHalf count={4.5} defaultValue={2.5} />
                        ]}
                    >
                    </Card>
                )}
            </Skeleton>
        </div>
    )
}

export default VendorInfo
