import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const BusinessContext = createContext();

function BusinessContextProvider(props) {
    const [businessInfo, setBusinessInfo] = useState(null);
    const [selectedBusiness, setSelectedBusiness] = useState({});
    const { userData, dispatch } = useContext(AuthContext);

    useEffect(() => {
        const endpoint =
            "https://tt.delivera.uz/api/users/get-business-entities";
        axios({
            method: "get",
            url: endpoint,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then((response) => {
                console.log(response.data);
                setBusinessInfo(response.data);
            })
            .catch((error) => {
                console.log(error, "error in categories");
            });
    }, []);
    return (
        <BusinessContext.Provider value={{ businessInfo, setBusinessInfo, selectedBusiness, setSelectedBusiness }}>
            {props.children}
        </BusinessContext.Provider>
    );
}

export default BusinessContextProvider;
