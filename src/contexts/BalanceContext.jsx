import React, { createContext, useReducer, useContext, useState, useEffect } from 'react'
import { balanceReducer } from '../reducers/BalanceReducer';
import axios from 'axios'
import { AuthContext } from './AuthContext';
import { message } from 'antd'

export const BalanceContext = createContext();

function BalanceContextProvider(props) {
    // const [balance, dispatch] = useReducer(balanceReducer, 0)
    const { userData, dispatch } = useContext(AuthContext)
    const [balance, setBalance] = useState(0)
    useEffect(() => {
        if (userData.token) {
            const endpoint = "https://ttuz.azurewebsites.net/api/users/user-balance";
            axios({
                method: "post",
                url: endpoint,
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${userData.token}`
                }
            })
                .then(response => {
                    setBalance(response.data)
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        message.info('Сессия истекла', 2);
                        dispatch({ type: 'SIGN_IN' })
                    }
                    console.log(error, "error in categories");
                });
        }
    }, [userData])
    return (
        <BalanceContext.Provider value={{ balance, setBalance }}>
            {props.children}
        </BalanceContext.Provider>
    )
}

export default BalanceContextProvider
