import { List, Avatar, Icon, Skeleton, message } from 'antd';
import { useParams } from 'react-router-dom';
import React, { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import HeartIcons from '../../Icons/HeartIcons';
import moment from 'moment';
moment.locale('ru')


function MainList() {
    const { userData, dispatch } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [listData, setListData] = useState([{}, {}, {}, {}]);

    let { id } = useParams();

    function br2nl(str) {
        return str.replace(/<br\s*\/?>/mg, "\n");
    }
    function momentize(date) {
        return moment(date).format('LLLL')
    }
    useEffect(() => {
        const data = JSON.stringify({
            categoryId: id
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
                console.log(response.data)
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
    }, []);
    return (
        <div className="container">
            <div id="mainlist">
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 3,
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
                                        src={`https://ttuz.azurewebsites.net/${item.images[0].path}`}
                                    /></div>)
                            }
                        >
                            <Skeleton loading={loading} active avatar>
                                {!loading && (
                                    <>
                                        <List.Item.Meta
                                            // avatar={<Avatar src={`https://ttuz.azurewebsites.net/${item.images[0].path}`} />}
                                            title={<><Link style={{ width: '70%', float: 'left' }} to={`/item/${item.id}`}>{item.title}</Link><p style={{ display: 'inline-block', width: '30%', textAlign: 'right' }}>{item.price.amount} Сум</p></>}
                                        // description={br2nl(item.description)}
                                        />
                                        {item.content}
                                        <p style={{color: 'white'}}>asd</p>
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
