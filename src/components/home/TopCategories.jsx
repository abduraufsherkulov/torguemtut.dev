import React, { useState, useEffect } from 'react'
import axios from 'axios';

function TopCategories() {


    const [category, setCategory] = useState([]);

    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/category";
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
                // console.log(response.data);
                setCategory(response.data);
            })
            .catch(error => {
                console.log(error, "error in categories");
            });

    }, []);

    return (
        <div id="topcategories">
            asd
        </div>
    )
}

export default TopCategories
