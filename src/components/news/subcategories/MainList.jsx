import { List, Avatar, Skeleton, message } from 'antd';
import { useParams } from 'react-router-dom';
import React, { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import HeartIcons from '../../Icons/HeartIcons';
import moment from 'moment';
import SubcategoriesFilter from './SubcategoriesFilter';
moment.locale('ru')


function MainList() {
    const { userData, dispatch } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [listData, setListData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    let { id } = useParams();

    function momentize(date) {
        return moment(date).format('LLLL')
    }
    useEffect(() => {
        setLoading(true)
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
                console.log(pagination)
                setPagination(pagination);
                setListData(response.data);
                setLoading(false)
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
        <div className="container">
            <div className="filtration">
                <SubcategoriesFilter catId={id} />
            </div>
            <div id="mainlist">
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
                        <List.Item
                            className="ant-card-hoverable"
                            style={{ display: 'flex', padding: '16px' }}
                            key={item.id}
                            actions={!loading && [
                                <HeartIcons setListData={setListData} listData={listData} item={item} favourite={item.favourite} />,
                                <p>Добавлено в {momentize(item.updatedDate)}</p>
                            ]}
                            extra={
                                !loading && (
                                    <div className="listExtra"><img
                                        style={{ maxWidth: "150px", maxHeight: "130px" }}
                                        alt="logo"
                                        src={`https://ttuz.azurewebsites.net/Resources/Images/${item.images[0].path}`}
                                    /></div>)
                            }
                        >
                            <Skeleton loading={loading} active avatar>
                                {!loading && (
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
            </div>
        </div>
    )
}
export default withRouter(MainList)
