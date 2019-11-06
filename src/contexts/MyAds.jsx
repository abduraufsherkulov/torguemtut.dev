import React, { createContext, useReducer, useState, useEffect } from 'react'
// import { authReducer } from '../reducers/AuthReducer';
import axios from 'axios'
export const MyAdsContext = createContext();

function MyAdsProvider(props) {
    const [myAds, setMyAds] = useState([]);
    const [activeKey, setActiveKey] = useState("active");
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
    console.log(activeKey);
    return (
        <MyAdsContext.Provider value={{ myAds, setMyAds, activeKey, setActiveKey }}>
            {props.children}
        </MyAdsContext.Provider>
    )
}

export default MyAdsProvider
