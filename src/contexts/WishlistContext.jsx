import React, { createContext, useReducer, useEffect, useContext, useState } from 'react'
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { wishlistReducer } from '../reducers/WishlistReducer';
import { message, Button } from 'antd';

export const WishlistContext = createContext();

function WishlistContextProvider(props) {

    const { userData, dispatch: dispatcher } = useContext(AuthContext);


    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ TotalCount: 0 });
    const pageSize = 16;

    const [{ wishlist }, dispatch] = useReducer(wishlistReducer, { wishlist: [] })

    useEffect(() => {
        const endpoint = "https://tt.delivera.uz/api/news/get-all-favourites";
        axios({
            method: 'post',
            url: endpoint,
            data: {
                pageSize: pageSize,
                pageNumber: currentPage,
            },
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            let pagination = JSON.parse(response.headers['x-pagination']);
            setPagination(pagination);
            dispatch({ type: 'INIT_WISHLIST', wishlist: response.data });
        }).catch(error => {
            console.log(error.response.status);
            if (error.response.status == 401 && userData.session == true) {
                message.info('Сессия истекла', 2);
                dispatcher({ type: 'SESSION_EXPIRED' })
            }
        })
    }, [userData.token, currentPage]);

    const addWish = (wish, listData, setListData) => {
        const key = 'updatable';
        let selectedWish = listData.findIndex(x => x.id == wish.id);
        listData[selectedWish].favourite = true;
        setListData([...listData]);
        message.loading({ content: 'Добавление в избранных...', key });
        const endpoint = `https://tt.delivera.uz/api/news/post-favourite?newsId=${wish.id}`;
        axios({
            method: 'post',
            url: endpoint,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            if (response.data.status) {
                message.success({ content: 'Добавлено в избранные', key, duration: 2 });
                dispatch({ type: 'ADD_WISH', wishlist: wish });
            } else {
                listData[selectedWish].favourite = false;
                setListData([...listData]);
                message.error({ content: 'Что то пошло не так', key, duration: 2 });
            }
        }).catch(error => {
            if (error.response.status == 401 && userData.session == true) {
                message.info('Сессия истекла', 2);
                dispatcher({ type: 'SESSION_EXPIRED' })
            }
            listData[selectedWish].favourite = false;
            setListData([...listData]);
            message.error({ content: 'Что то пошло не так', key, duration: 2 });
        })
    }

    const removeWish = (wish, listData, setListData) => {
        const key = 'updatable';
        let selectedWish = listData.findIndex(x => x.id == wish.id);
        listData[selectedWish].favourite = false;
        setListData([...listData]);
        message.loading({ content: 'Удаление из избранных...', key });
        const endpoint = `https://tt.delivera.uz/api/news/delete-favourite?newsId=${wish.id}`;
        axios({
            method: 'post',
            url: endpoint,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            if (response.data.status) {
                message.success({ content: 'Удалено из избранных', key, duration: 2 });
                dispatch({ type: 'REMOVE_WISH', wishlist: wish });
            } else {
                listData[selectedWish].favourite = true;
                setListData([...listData]);
                message.error({ content: 'Что то пошло не так', key, duration: 2 });
            }
        }).catch(error => {
            if (error.response.status == 401 && userData.session == true) {
                message.info('Сессия истекла', 2);
                dispatcher({ type: 'SESSION_EXPIRED' })
            }
            listData[selectedWish].favourite = true;
            setListData([...listData]);
            message.error({ content: 'Что то пошло не так', key, duration: 2 });
        })
    }

    return (
        <WishlistContext.Provider value={{ wishlist, dispatch, addWish, removeWish, currentPage, setCurrentPage, pagination, pageSize }}>
            {props.children}
        </WishlistContext.Provider>
    )
}
export default WishlistContextProvider
