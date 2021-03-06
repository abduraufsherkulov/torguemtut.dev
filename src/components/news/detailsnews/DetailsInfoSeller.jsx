import React, { useState, useEffect } from 'react'
import { Card, Avatar, Skeleton, Button, Rate } from 'antd';
import GoogleMapsApi from '../adnews/GoogleMapsApi';
import HeartIcons from '../../Icons/HeartIcons';
import VendorHeartIcons from '../../Icons/VendorHeartIcons';
import { Link } from 'react-router-dom'

import { PhoneOutlined, UserOutlined } from '@ant-design/icons';

const { Meta } = Card;

function DetailsInfoSeller({ listData, setListData, item }) {
    const [loading, setLoading] = useState(true);
    const [position, setPosition] = useState({
        RegionId: 1,
        DistrictId: 1,
        Address: "",
        Longtitude: 69.279718,
        Latitude: 41.311157
    })
    useEffect(() => {
        if (item.location !== undefined) {
            setLoading(false)
            setPosition({
                RegionId: 1,
                DistrictId: 1,
                Address: "",
                Longtitude: +item.location.longtitude,
                Latitude: +item.location.latitude
            })
        }
    }, [item])
    console.log(item)
    return (
        <div>
            <Card>
                <Skeleton paragraph={{ rows: 0, width: "100%" }} loading={loading} active>
                    {!loading && (
                        <>
                            <h2>{item.price.amount} {item.price.currencyLabel}</h2>
                        </>
                    )
                    }
                </Skeleton>
            </Card>
            <Skeleton paragraph={{ rows: 0 }} loading={loading} active>
                {!loading && (<Button href={`tel:${item.contactDetail.phone}`} type="primary" block ><PhoneOutlined />{item.contactDetail.phone}</Button>)}
            </Skeleton>
            <Skeleton paragraph={{ rows: 0 }} loading={loading} active>
                {!loading && (
                    <Card
                        style={{ display: 'flex', flexDirection: 'column' }}
                        extra={<VendorHeartIcons single={false} listData={listData} setListData={setListData} item={item} vendorFavourite={item.vendorFavourite} />}
                        title={<Meta
                            style={{ display: 'flex', alignItems: 'center' }}
                            avatar={<Avatar size="large" icon={<UserOutlined />} />}
                            title={<Link to={`/vendorproducts/${item.ownerId}`}>{item.ownerDetails.phone}</Link>}
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

export default DetailsInfoSeller
