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
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <WishlistContext.Provider value={{ userData, dispatch }}>
            {props.children}
        </WishlistContext.Provider>
    )
}

export default WishlistContextProvider
