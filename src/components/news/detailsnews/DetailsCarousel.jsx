import React, { useState, useEffect } from 'react'
import { Carousel, Skeleton } from 'antd';
import Magnifier from "react-magnifier";


function DetailsCarousel({ listData }) {
    const [loading, setLoading] = useState(true)
    function onChange(a, b, c) {
        console.log(a, b, c);
    }
    useEffect(() => {
        if (listData !== undefined) {
            console.log('ok')
            setLoading(false)
        }
    }, [listData])
    console.log(listData);
    return (
        <Skeleton active loading={loading}>
            {!loading && (
                <Carousel className="detailscarousel" afterChange={onChange}>
                    {listData.map(item => (
                        <Magnifier style={{ maxWidth: '100%', maxHeight: '100%' }} key={item.createdDate} src={`https://tt.delivera.uz/Resources/Images/${item.path}`} />
                    ))}
                </Carousel>
            )}
        </Skeleton>
    )
}

export default DetailsCarousel
