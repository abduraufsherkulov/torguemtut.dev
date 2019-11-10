import React, { useState, useEffect } from 'react'
import { Card, Icon, Avatar, Skeleton, Button, Rate } from 'antd';
import GoogleMapsApi from '../adnews/GoogleMapsApi';

const { Meta } = Card;

function DetailsInfoSeller({ listData }) {
    const [loading, setLoading] = useState(true);
    const [position, setPosition] = useState({
        RegionId: 1,
        DistrictId: 1,
        Address: "",
        Longtitude: 69.279718,
        Latitude: 41.311157
    })
    useEffect(() => {
        if (listData.location !== undefined) {
            setLoading(false)
            setPosition({
                RegionId: 1,
                DistrictId: 1,
                Address: "",
                Longtitude: +listData.location.longtitude,
                Latitude: +listData.location.latitude
            })
        }
    }, [listData])

    return (
        <div>
            <Card>
                <Skeleton paragraph={{ rows: 0, width: "100%" }} loading={loading} active>
                    {!loading && (
                        <>
                            <h2>{listData.price.amount}</h2>
                        </>
                    )
                    }
                </Skeleton>
            </Card>
            <Skeleton paragraph={{ rows: 0 }} loading={loading} active>
                {!loading && (<Button href={`tel:${listData.contactDetail.phone}`} type="primary" block ><Icon type="phone" />{listData.contactDetail.phone}</Button>)}
            </Skeleton>
            <Card
                cover={
                    <GoogleMapsApi position={position} defaultZoom={17} />
                }
                actions={[
                    <Rate disabled={true} allowHalf count={4.5} defaultValue={2.5} />
                ]}
            >
                <Meta
                    avatar={<Avatar icon="user" />}
                    title="Доу"
                    description="Джон"
                />
            </Card>
        </div>
    )
}

export default DetailsInfoSeller
