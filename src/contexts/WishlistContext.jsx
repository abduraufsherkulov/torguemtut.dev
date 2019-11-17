import React, { createContext, useReducer, useEffect, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { wishlistReducer } from '../reducers/WishlistReducer';
import { message, Button } from 'antd';

export const WishlistContext = createContext();

function WishlistContextProvider(props) {

    const { userData, dispatch: dispatcher } = useContext(AuthContext);

    const [{ wishlist }, dispatch] = useReducer(wishlistReducer, { wishlist: [] })

    useEffect(() => {
        if (userData.token) {
            const endpoint = "https://ttuz.azurewebsites.net/api/news/get-all-favourites";
            axios({
                method: 'post',
                url: endpoint,
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${userData.token}`
                }
            }).then(response => {
                console.log(response, 'wishlist')
                dispatch({ type: 'INIT_WISHLIST', wishlist: response.data });
            }).catch(error => {
                console.log(error.response.status);
                if (error.response.status == 401) {
                    message.info('Сессия истекла', 2);
                    dispatcher({ type: 'SIGN_IN' })
                }
            })
        }
    }, []);

    const addWish = (wish, listData, setListData) => {
        const key = 'updatable';
        let selectedWish = listData.findIndex(x => x.id == wish.id);
        listData[selectedWish].favourite = true;
        setListData([...listData]);
        message.loading({ content: 'Добавление в избранных...', key });
        const endpoint = `https://ttuz.azurewebsites.net/api/news/post-favourite?newsId=${wish.id}`;
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
            if (error.response.status == 401) {
                message.info('Сессия истекла', 2);
                dispatcher({ type: 'SIGN_IN' })
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
        const endpoint = `https://ttuz.azurewebsites.net/api/news/delete-favourite?newsId=${wish.id}`;
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
            if (error.response.status == 401) {
                message.info('Сессия истекла', 2);
                dispatcher({ type: 'SIGN_IN' })
            }
            listData[selectedWish].favourite = true;
            setListData([...listData]);
            message.error({ content: 'Что то пошло не так', key, duration: 2 });
        })
    }

    return (
        <WishlistContext.Provider value={{ wishlist, dispatch, addWish, removeWish }}>
            {props.children}
        </WishlistContext.Provider>
    )
}
export default WishlistContextProvider
