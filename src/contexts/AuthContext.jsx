import React, { createContext, useReducer } from 'react'
import { authReducer } from '../reducers/AuthReducer';

export const AuthContext = createContext();

function AuthContextProvider(props) {
    const [username, dispatch] = useReducer(authReducer, null, () => {
        const localName = localStorage.getItem('username');
        return localName ? localName : null;
    })
    // console.log(username);
    return (
        <AuthContext.Provider value={{ username, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
