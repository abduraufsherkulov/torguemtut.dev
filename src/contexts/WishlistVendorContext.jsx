import React, { createContext, useEffect, useContext, useReducer } from 'react'
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { wishlistReducer } from '../reducers/WishlistReducer';
import { message, Button } from 'antd';

export const WishlistVendorContext = createContext();


function WishlistVendorContextProvider(props) {
    const { userData, dispatch: dispatcher } = useContext(AuthContext);
    const [{ wishlistvendor }, dispatch] = useReducer(wishlistReducer, { wishlistvendor: [] })

    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/news/get-vendors";
        axios({
            method: 'post',
            url: endpoint,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            console.log(response);
            dispatch({ type: 'INIT_WISHLIST_VENDOR', wishlistvendor: response.data });
        }).catch(error => {
            // console.log(error.response.status);
            if (error.response.status == 401) {
                message.info('Сессия истекла', 2);
                dispatcher({ type: 'SIGN_IN' })
            }
        })
    }, [])


    const addWish = (wish, listData, setListData) => {
        const key = 'updatable';
        let selectedWish = listData.findIndex(x => x.ownerId == wish.ownerId);
        listData[selectedWish].vendorFavourite = true;
        setListData([...listData]);
        message.loading({ content: 'Добавление в избранных...', key });
        const endpoint = `https://ttuz.azurewebsites.net/api/news/post-vendor-favourite?targetUserId=${wish.ownerId}`;
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
            if (error.response.status == 401) {
                message.info('Сессия истекла', 2);
                dispatcher({ type: 'SIGN_IN' })
            }
            listData[selectedWish].vendorFavourite = false;
            setListData([...listData]);
            message.error({ content: 'Что то пошло не так', key, duration: 2 });
        })
    }

    const removeWish = (wish, listData, setListData) => {
        console.log(wish)
        const key = 'updatable';
        let selectedWish = listData.findIndex(x => x.ownerId == wish.ownerId);
        listData[selectedWish].vendorFavourite = false;
        setListData([...listData]);
        message.loading({ content: 'Удаление из избранных...', key });
        const endpoint = `https://ttuz.azurewebsites.net/api/news/delete-vendor-favourite?targetUserId=${wish.ownerId}`;
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
            if (error.response.status == 401) {
                message.info('Сессия истекла', 2);
                dispatcher({ type: 'SIGN_IN' })
            }
            listData[selectedWish].vendorFavourite = true;
            setListData([...listData]);
            message.error({ content: 'Что то пошло не так', key, duration: 2 });
        })
    }

    return (
        <WishlistVendorContext.Provider value={{ wishlistvendor, dispatch, addWish, removeWish }}>
            {props.children}
        </WishlistVendorContext.Provider>
    )
}

export default WishlistVendorContextProvider
