import React, { createContext, useEffect, useContext, useReducer, useState } from 'react'
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { wishlistReducer } from '../reducers/WishlistReducer';
import { message, Button } from 'antd';

export const WishlistVendorContext = createContext();


function WishlistVendorContextProvider(props) {
    const { userData, dispatch: dispatcher } = useContext(AuthContext);
    const [{ wishlistvendor }, dispatch] = useReducer(wishlistReducer, { wishlistvendor: [] })

    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ TotalCount: 0 });
    const pageSize = 16;
    useEffect(() => {
        const endpoint = "https://tt.delivera.uz/api/news/get-vendors";
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
            console.log(response, 'vendors asd asd asd as das d')
            let pagination = JSON.parse(response.headers['x-pagination']);
            setPagination(pagination);
            dispatch({ type: 'INIT_WISHLIST_VENDOR', wishlistvendor: response.data });
        }).catch(error => {
            console.log(error);
            if (error.response.status == 401 && userData.session == true) {
                message.info('Сессия истекла', 2);
                dispatcher({ type: 'SESSION_EXPIRED' })
            }
        })
    }, [userData.token])


    const addWish = (wish, listData, setListData, single) => {
        if (single) {
            const key = 'updatable';
            setListData({ ...wish, vendorFavourite: true });
            message.loading({ content: 'Добавление в избранных...', key });
            const endpoint = `https://tt.delivera.uz/api/news/post-vendor-favourite?targetUserId=${wish.userId}`;
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
                    dispatch({ type: 'ADD_WISH_VENDOR', wishlistvendor: wish });
                } else {
                    setListData({ ...wish, vendorFavourite: false });
                    message.error({ content: 'Что то пошло не так', key, duration: 2 });
                }
            }).catch(error => {
                if (error.response.status == 401 && userData.session == true) {
                    message.info('Сессия истекла', 2);
                    dispatcher({ type: 'SESSION_EXPIRED' })
                }
                setListData({ ...wish, vendorFavourite: false });
                message.error({ content: 'Что то пошло не так', key, duration: 2 });
            })
        } else {
            const key = 'updatable';
            let selectedWish = listData.findIndex(x => x.ownerDetails.userId == wish.ownerDetails.userId);
            listData[selectedWish].vendorFavourite = true;
            setListData([...listData]);
            message.loading({ content: 'Добавление в избранных...', key });
            const endpoint = `https://tt.delivera.uz/api/news/post-vendor-favourite?targetUserId=${wish.ownerDetails.userId}`;
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
                    dispatch({ type: 'ADD_WISH_VENDOR', wishlistvendor: wish.ownerDetails });
                } else {
                    listData[selectedWish].vendorFavourite = false;
                    setListData([...listData]);
                    message.error({ content: 'Что то пошло не так', key, duration: 2 });
                }
            }).catch(error => {
                if (error.response.status == 401 && userData.session == true) {
                    message.info('Сессия истекла', 2);
                    dispatcher({ type: 'SESSION_EXPIRED' })
                }
                listData[selectedWish].vendorFavourite = false;
                setListData([...listData]);
                message.error({ content: 'Что то пошло не так', key, duration: 2 });
            })
        }
    }

    const removeWish = (wish, listData, setListData, single) => {
        if (single) {
            const key = 'updatable';
            setListData({ ...wish, vendorFavourite: false });
            message.loading({ content: 'Удаление из избранных...', key });
            const endpoint = `https://tt.delivera.uz/api/news/delete-vendor-favourite?targetUserId=${wish.userId}`;
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
                    dispatch({ type: 'REMOVE_WISH_VENDOR', wishlistvendor: wish });
                } else {
                    setListData({ ...wish, vendorFavourite: true });
                    setListData(wish);
                    message.error({ content: 'Что то пошло не так', key, duration: 2 });
                }
            }).catch(error => {
                if (error.response.status == 401 && userData.session == true) {
                    message.info('Сессия истекла', 2);
                    dispatcher({ type: 'SESSION_EXPIRED' })
                }
                setListData({ ...wish, vendorFavourite: true });
                message.error({ content: 'Что то пошло не так', key, duration: 2 });
            })
        } else {

            const key = 'updatable';
            let selectedWish = listData.findIndex(x => x.ownerDetails.userId == wish.ownerDetails.userId);
            listData[selectedWish].vendorFavourite = false;
            setListData([...listData]);
            message.loading({ content: 'Удаление из избранных...', key });
            const endpoint = `https://tt.delivera.uz/api/news/delete-vendor-favourite?targetUserId=${wish.ownerDetails.userId}`;
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
                    dispatch({ type: 'REMOVE_WISH_VENDOR', wishlistvendor: wish.ownerDetails });
                } else {
                    listData[selectedWish].vendorFavourite = true;
                    setListData([...listData]);
                    message.error({ content: 'Что то пошло не так', key, duration: 2 });
                }
            }).catch(error => {
                if (error.response.status == 401 && userData.session == true) {
                    message.info('Сессия истекла', 2);
                    dispatcher({ type: 'SESSION_EXPIRED' })
                }
                listData[selectedWish].vendorFavourite = true;
                setListData([...listData]);
                message.error({ content: 'Что то пошло не так', key, duration: 2 });
            })
        }
    }
    return (
        <WishlistVendorContext.Provider value={{ wishlistvendor, dispatch, addWish, removeWish, currentPage, setCurrentPage, pagination, pageSize }}>
            {props.children}
        </WishlistVendorContext.Provider>
    )
}

export default WishlistVendorContextProvider
