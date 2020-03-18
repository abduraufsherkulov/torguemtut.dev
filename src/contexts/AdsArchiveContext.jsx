import React, { createContext, useReducer, useState, useEffect, useContext } from 'react'
// import { authReducer } from '../reducers/AuthReducer';
import axios from 'axios'
import { AuthContext } from './AuthContext';
import { message } from 'antd'
export const AdsArchiveContext = createContext();

function AdsArchiveProvider(props) {
    const { userData, dispatch } = useContext(AuthContext);
    const [archiveAds, setArchiveAds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ TotalCount: 0 });
    const pageSize = 16;

    useEffect(() => {
        const endpoint = "https://tt.delivera.uz/api/news/get-all-by-user";
        axios({
            method: "post",
            url: endpoint,
            data: {
                PageSize: 100,
                Status: 3
            },
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(response => {
                let pagination = JSON.parse(response.headers['x-pagination']);
                setPagination(pagination);
                setArchiveAds(response.data);
            })
            .catch(error => {
                console.log(error)
                if (error.response.status == 401) {
                    message.info('Сессия истекла', 2);
                    dispatch({ type: 'SIGN_IN' })
                }
                console.log(error, "error in categories");
            });
    }, [userData.token])
    return (
        <AdsArchiveContext.Provider value={{ archiveAds, setArchiveAds, currentPage, setCurrentPage, pagination, pageSize }}>
            {props.children}
        </AdsArchiveContext.Provider>
    )
}

export default AdsArchiveProvider
