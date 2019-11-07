import React, { createContext, useReducer, useState, useEffect, useContext } from 'react'
// import { authReducer } from '../reducers/AuthReducer';
import axios from 'axios'
import { AuthContext } from './AuthContext';
export const MyAdsContext = createContext();

function MyAdsProvider(props) {
    const { userData } = useContext(AuthContext);
    const [myAds, setMyAds] = useState([]);
    const [activeKey, setActiveKey] = useState("active");
    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/news/get-all-by-user";
        axios({
            method: "post",
            url: endpoint,
            data: {},
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(response => {
                console.log(response);
                setMyAds(response.data);
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
