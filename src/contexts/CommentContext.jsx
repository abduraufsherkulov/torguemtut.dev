import React, { createContext, useState } from 'react'

export const CommentContext = createContext();

function CommentContextProvider(props) {
    const [comments, setComments] = useState([])
    return (
        <CommentContext.Provider value={{ comments, setComments }}>
            {props.children}
        </CommentContext.Provider>
    )
}

export default CommentContextProvider
