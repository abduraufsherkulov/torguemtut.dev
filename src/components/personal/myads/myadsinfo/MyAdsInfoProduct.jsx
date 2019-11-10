import React, { useState, useEffect } from 'react'
import { Card, Descriptions, Divider, Button } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
moment.locale('ru')

function MyAdsInfoProduct({ listData }) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (listData.contactDetail !== undefined) {
            setLoading(false);
            console.log(moment(listData.createdDate).format('LLLL'));
        }
    }, [listData])

    function momentize(date) {
        return moment(date).format('LLLL')
    }

    return (
        <Card loading={loading}>
            {!loading && (
                <>
                    <h1>{listData.title}</h1>
                    <h1>Добавлено в {momentize(listData.createdDate)}</h1>
                    <h1>Номер объявления:  {listData.id}</h1>
                    <Divider />
                    <Descriptions title="" column={2}>
                        <Descriptions.Item label="Объявление от">Частного лица</Descriptions.Item>
                        <Descriptions.Item label="Количество комнат">6</Descriptions.Item>
                        <Descriptions.Item label="Этаж">1</Descriptions.Item>
                        <Descriptions.Item label="Этажность дома">4</Descriptions.Item>
                        <Descriptions.Item label="В квартире есть">Балкон</Descriptions.Item>
                        <Descriptions.Item label="Ремонт">Требует ремонта</Descriptions.Item>
                    </Descriptions>
                    <Divider />

                    <p>{listData.description}</p>
                    <Button type="primary"><Link to={`/boostad/${listData.id}`}>Купить пакет</Link></Button>
                </>
            )}
        </Card>
    )
}

export default MyAdsInfoProduct
