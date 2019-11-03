import React, { createContext, useReducer, useState, useEffect } from 'react'
// import { authReducer } from '../reducers/AuthReducer';
import axios from 'axios'
export const MyAds = createContext();

function MyAdsProvider(props) {
    const [myAds, setMyAds] = useState([]);
    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/news/get-all";
        axios({
            method: "post",
            url: endpoint,
            data: {},
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`
            }
        })
            .then(response => {
                console.log(response);
                // setMyAds(response.data);
            })
            .catch(error => {
                console.log(error, "error in categories");
            });
    }, [])
    return (
        <MyAds.Provider value={{ myAds, setMyAds }}>
            {props.children}
        </MyAds.Provider>
    )
}

export default MyAdsProvider
