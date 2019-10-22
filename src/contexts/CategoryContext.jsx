import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const CategoryContext = createContext();

function CategoryContextProvider(props) {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/category/get-all";
        axios({
            method: "get",
            url: endpoint,
            //   auth: {
            //     username: "delivera",
            //     password: "X19WkHHupFJBPsMRPCJwTbv09yCD50E2"
            //   },
            //   headers: {
            //     "content-type": "application/json",
            //     token: token
            //   }
        })
            .then(response => {
                console.log(response.data);
                setCategory(response.data);
            })
            .catch(error => {
                console.log(error, "error in categories");
            });

    }, []);

    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider
