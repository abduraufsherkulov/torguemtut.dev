import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext';
import axios from 'axios'

export const UserInfoContext = createContext();

function UserInfoContextProvider(props) {
    const { userData, dispatch } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        const endpoint = `https://tt.delivera.uz/api/users/get-profile?userId=${userData.id}`;
        axios({
            method: "post",
            url: endpoint,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(response => {
                console.log(response.data, 'userinfo callaed')
                setUserInfo(response.data);
            })
            .catch(error => {
                console.log(error);
                // if (error.response.status == 401 && userData.session == true) {
                //     message.info('Сессия истекла', 2);
                //     dispatch({ type: 'SIGN_IN' })
                // }
                console.log(error.response, "error in categories");
            });
    }, [userData.token])
    console.log(userInfo, 'here tester')
    return (
        <UserInfoContext.Provider value={{
            userInfo, setUserInfo
        }}>
            {props.children}
        </UserInfoContext.Provider >
    )
}

export default UserInfoContextProvider
