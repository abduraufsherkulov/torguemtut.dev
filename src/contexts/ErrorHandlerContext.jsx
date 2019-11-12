import React from 'react'

const ErrorHandlerContext = createContext();


function ErrorHandlerContext(props) {
    const [session, setSession] = useState([])
    
    return (
        <ErrorHandlerContext.Provider value={{}}>
            {props.children}
        </ErrorHandlerContext.Provider>
    )
}

export default ErrorHandlerContext
