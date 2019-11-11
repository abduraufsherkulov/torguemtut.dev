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
                        <Magnifier height={'100%'} key={item.createdDate} src={`https://ttuz.azurewebsites.net/${item.path.replace(/\\/g, "/")}`} />
                    ))}
                </Carousel>
            )}
        </Skeleton>
    )
}

export default DetailsCarousel
