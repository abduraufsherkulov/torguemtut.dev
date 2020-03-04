import { List, Avatar, Skeleton, message } from 'antd';
import React, { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import HeartIcons from '../../Icons/HeartIcons';
import { momentize } from '../../../helpers/MomentHelper';

function VipInCategories({ id, userData, vipLoading, setVipLoading }) {
    const [listData, setListData] = useState([{}, {}, {}, {}, {}]);
    // const [pagination, setPagination] = useState({});
    useEffect(() => {
        setVipLoading(true)
        const data = JSON.stringify({
            Type: 1,
            categoryId: id,
            pageSize: 5,
            // pageNumber: currentPage
        })
        const endpoint = `https://ttuz.azurewebsites.net/api/news/get-all-by-tariff`;
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
                let pagination = JSON.parse(response.headers['x-pagination']);
                console.log(pagination)
                // setPagination(pagination);
                setListData(response.data);
                setVipLoading(false)
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
        <React.Fragment>
            <h1>VIP объявлении</h1>
            <List
                itemLayout="vertical"
                size="large"
                // pagination={{
                //     onChange: page => {
                //         handleChange(page);
                //     },
                //     pageSize: 30,
                //     total: pagination.TotalCount
                // }}
                dataSource={listData}
                footer={
                    <div>
                        {/* <b>ant design</b> footer part */}
                    </div>
                }
                renderItem={item => (
                    <List.Item
                        className="ant-card-hoverable"
                        style={{ display: 'flex', padding: '16px' }}
                        key={item.id}
                        actions={!vipLoading && [
                            <HeartIcons setListData={setListData} listData={listData} item={item} favourite={item.favourite} />,
                            <p>Добавлено в {momentize(item.updatedDate)}</p>
                        ]}
                        extra={
                            !vipLoading && (
                                <div className="listExtra">
                                    <div className="vip-links">
                                        <i className="spanner">VIP</i>
                                    </div>
                                    <img
                                        style={{ maxWidth: "150px", maxHeight: "130px" }}
                                        alt="logo"
                                        src={`https://ttuz.azurewebsites.net/Resources/Images/${item.images[0].path}`}
                                    /></div>)
                        }
                    >
                        <Skeleton loading={vipLoading} active avatar>
                            {!vipLoading && (
                                <>
                                    <List.Item.Meta
                                        // avatar={<Avatar src={`https://ttuz.azurewebsites.net/${item.images[0].path}`} />}
                                        title={<><Link style={{ width: '70%', float: 'left' }} to={`/item/${item.id}`}>{item.title}</Link><p style={{ display: 'inline-block', width: '30%', textAlign: 'right' }}>{item.price.amount} {item.price.currencyLabel}</p></>}
                                    // description={br2nl(item.description)}
                                    />
                                    {item.content}
                                    <p style={{ color: 'white' }}>asd</p>
                                </>
                            )}
                        </Skeleton>
                    </List.Item>
                )}
            />
        </React.Fragment>
    )
}

export default VipInCategories
