import React, { createContext, useReducer, useEffect, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { wishlistReducer } from '../reducers/WishlistReducer';

export const WishlistContext = createContext();

function WishlistContextProvider(props) {

    const { userData } = useContext(AuthContext);

    const [{ wishlist }, dispatch] = useReducer(wishlistReducer, { wishlist: [] })

    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/news/get-all-favourites";
        axios({
            method: 'post',
            url: endpoint,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            dispatch({ type: 'INIT_WISHLIST', wishlist: response.data });
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const addWish = (wish) => {
        const endpoint = `https://ttuz.azurewebsites.net/api/news/post-favourite?newsId=${wish}`;
        axios({
            method: 'post',
            url: endpoint,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        }).then(response => {
            dispatch({ type: 'ADD_WISHLIST', wishlist: [...wishlist, response.data] });
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <WishlistContext.Provider value={{ wishlist, dispatch, addWish }}>
            {props.children}
        </WishlistContext.Provider>
    )
}

export default WishlistContextProvider
