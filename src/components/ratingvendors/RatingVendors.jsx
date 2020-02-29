import React from 'react'
import { Table, Divider, Tag, Rate } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

const columns = [

    {
        title: 'Ранг',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Количество объявлении',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Рейтинг',
        dataIndex: 'address',
        key: 'address',
        render: rating => <Rate disabled={true} allowHalf={true} value={rating} />
    },
    {
        title: 'Добавить в избранных',
        key: 'action',
        render: () => <HeartOutlined />,
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 5,
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 2,
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 2,
    },
];

function RatingVendors() {
    return (
        <div className="container">
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default RatingVendors
