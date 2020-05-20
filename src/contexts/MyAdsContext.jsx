import React, { createContext, useReducer, useState, useEffect, useContext } from 'react'
// import { authReducer } from '../reducers/AuthReducer';
import axios from 'axios'
import { AuthContext } from './AuthContext';
import { message } from 'antd'
export const MyAdsContext = createContext();

function MyAdsProvider(props) {
    const { userData, dispatch } = useContext(AuthContext);
    const [myAds, setMyAds] = useState([]);
    const [activeKey, setActiveKey] = useState("active");
    useEffect(() => {
        const endpoint = "https://tt.delivera.uz/api/news/get-all-by-user";
        axios({
            method: "post",
            url: endpoint,
            data: { PageSize: 100 },
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(response => {
                // console.log(response.headers)
                setMyAds(response.data);
            })
            .catch(error => {
                console.log(error)
                if (error.response.status == 401 && userData.session == true) {
                    message.info('Сессия истекла', 2);
                    dispatch({ type: 'SESSION_EXPIRED' })
                }
                console.log(error, "error in categories");
            });
    }, [userData.token])
    return (
        <MyAdsContext.Provider value={{ myAds, setMyAds, activeKey, setActiveKey }}>
            {props.children}
        </MyAdsContext.Provider>
    )
}

export default MyAdsProvider
