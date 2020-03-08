import { List, Avatar, Skeleton, message } from 'antd';
import React, { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import HeartIcons from '../../Icons/HeartIcons';
import moment from 'moment';
import { momentize } from '../../../helpers/MomentHelper';

function SubCategoriesList({ id, userData, currentPage, setCurrentPage, catLoading, setCatLoading }) {
    const [listData, setListData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    const [pagination, setPagination] = useState({});
    useEffect(() => {
        setCatLoading(true)
        const data = JSON.stringify({
            categoryId: id,
            pageSize: 30,
            pageNumber: currentPage
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
                let pagination = JSON.parse(response.headers['x-pagination']);
                console.log(response.data)
                setPagination(pagination);
                setListData(response.data);
                setCatLoading(false)
            })
            .catch(error => {
                if (error.response.status == 401) {
                    message.info('Сессия истекла', 2);
                    dispatch({ type: 'SIGN_IN' })
                }
                console.log(error.response, "error in categories");
            });
    }, [currentPage]);



    const handleChange = (page) => {
        setCurrentPage(page)
    }
    return (
        <React.Fragment>
            <h1>Обычные объявления</h1>
            <span>Найдено объявлений: {pagination.TotalCount ? pagination.TotalCount : 0}</span>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        handleChange(page);
                    },
                    pageSize: 30,
                    total: pagination.TotalCount
                }}
                dataSource={listData}
                footer={
                    <div>
                        {/* <b>ant design</b> footer part */}
                    </div>
                }
                renderItem={item => (
                    <Link to={`/item/${item.id}`}>
                        <List.Item
                            className="ant-card-hoverable"
                            style={{ display: 'flex', padding: '16px', border: item.tariffs && item.tariffs.find(x => x.type == 2) ? '4px solid #543f92' : 'none' }}
                            key={item.id}
                            actions={!catLoading && [
                                <HeartIcons setListData={setListData} listData={listData} item={item} favourite={item.favourite} />,
                                <p>Добавлено в {momentize(item.updatedDate)}</p>
                            ]}
                            extra={
                                !catLoading && (
                                    <div className="listExtra">
                                        {item.tariffs && item.tariffs.find(x => x.type == 1) ?
                                            <div className="vip-links">
                                                <i className="spanner">VIP</i>
                                            </div> : null}


                                        <img
                                            style={{ maxWidth: "150px", maxHeight: "130px" }}
                                            alt="logo"
                                            src={`https://ttuz.azurewebsites.net/Resources/Images/${item.images[0].path}`}
                                        /></div>)
                            }
                        >
                            <Skeleton loading={catLoading} active avatar>
                                {!catLoading && (
                                    <>
                                        <List.Item.Meta
                                            // avatar={<Avatar src={`https://ttuz.azurewebsites.net/${item.images[0].path}`} />}
                                            title={<><div style={{ width: '70%', float: 'left' }}>{item.title}</div><p style={{ display: 'inline-block', width: '30%', textAlign: 'right' }}>{item.price.amount} {item.price.currencyLabel}</p></>}
                                        // description={br2nl(item.description)}
                                        />
                                        {item.content}
                                        <p style={{ color: 'white' }}>asd</p>
                                    </>
                                )}
                            </Skeleton>
                        </List.Item>
                    </Link>
                )}
            />
        </React.Fragment>
    )
}

export default SubCategoriesList
