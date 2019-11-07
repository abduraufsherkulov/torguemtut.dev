import { List, Avatar, Icon } from 'antd';
import { useParams } from 'react-router-dom';
import React, { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { WishlistContext } from '../../../contexts/WishlistContext';


function MainList() {
    const { userData } = useContext(AuthContext)
    const [listData, setListData] = useState([]);
    const { addWish } = useContext(WishlistContext);

    let { id } = useParams();


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
                Authorization: `Bearer ${userData}`
            }
        })
            .then(response => {
                // console.log(response);
                setListData(response.data);
            })
            .catch(error => {
                console.log(error.response, "error in categories");
            });

    }, []);


    const handleWish = (e) => {
        addWish(e);
    }


    const IconText = ({ type, id }) => (
        <span>
            <Icon onClick={() => handleWish(id)} type={type} style={{ marginRight: 8 }} />
        </span>
    );

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
                            <b>ant design</b> footer part
                        </div>
                    }
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText id={item.id} type="heart-o" text="156" key="list-vertical-heart-o" />
                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src={`https://ttuz.azurewebsites.net/${item.images[0].path}`}
                                />
                            }
                        >
                            <List.Item.Meta
                                // avatar={<Avatar src={`https://ttuz.azurewebsites.net/${item.images[0].path}`} />}
                                title={<Link to={`/item/${item.id}`}>{item.title}</Link>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}
export default withRouter(MainList)
