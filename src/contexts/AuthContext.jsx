import React, { createContext, useReducer } from 'react'
import { authReducer } from '../reducers/AuthReducer';

export const AuthContext = createContext();

function AuthContextProvider(props) {
    const [userData, dispatch] = useReducer(authReducer, null, () => {
        const localData = localStorage.getItem('userData');
        return localData ? JSON.parse(localData) : {token: null, session: false};
    })
    console.log(userData)
    return (
        <AuthContext.Provider value={{ userData, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
