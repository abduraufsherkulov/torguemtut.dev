import React, {
    createContext,
    useReducer,
    useState,
    useEffect,
    useContext,
} from "react";
// import { authReducer } from '../reducers/AuthReducer';
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { message } from "antd";
export const AdsWaitingContext = createContext();

function AdsWaitingProvider(props) {
    const { userData, dispatch } = useContext(AuthContext);
    const [waitingAds, setWaitingAds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ TotalCount: 0 });
    const pageSize = 16;

    useEffect(() => {
        const endpoint = "https://tt.delivera.uz/api/news/get-all-by-user";
        axios({
            method: "post",
            url: endpoint,
            data: {
                Status: 1,
                pageSize: pageSize,
                pageNumber: currentPage,
            },
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then((response) => {
                let pagination = JSON.parse(response.headers["x-pagination"]);
                setPagination(pagination);
                setWaitingAds(response.data);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status == 401 && userData.session == true) {
                    message.info("Сессия истекла", 2);
                    dispatch({ type: "SESSION_EXPIRED" });
                }
                console.log(error, "error in categories");
            });
    }, [userData.token, currentPage]);
    return (
        <AdsWaitingContext.Provider
            value={{
                waitingAds,
                setWaitingAds,
                currentPage,
                setCurrentPage,
                pageSize,
                pagination,
                setPagination,
            }}
        >
            {props.children}
        </AdsWaitingContext.Provider>
    );
}

export default AdsWaitingProvider;
