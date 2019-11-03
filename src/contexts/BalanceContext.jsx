import React, { createContext, useReducer, useContext, useState, useEffect } from 'react'
import { balanceReducer } from '../reducers/BalanceReducer';
import axios from 'axios'

export const BalanceContext = createContext();

function BalanceContextProvider(props) {
    // const [balance, dispatch] = useReducer(balanceReducer, 0)
    const [balance, setBalance] = useState(0)
    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/users/user-balance";
        axios({
            method: "post",
            url: endpoint,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`
            }
        })
            .then(response => {
                setBalance(response.data)
            })
            .catch(error => {
                console.log(error, "error in categories");
            });
    }, [])
    return (
        <BalanceContext.Provider value={{ balance, setBalance }}>
            {props.children}
        </BalanceContext.Provider>
    )
}

export default BalanceContextProvider
