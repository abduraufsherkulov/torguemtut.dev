import { List, Avatar, Skeleton, message } from "antd";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import ListView from "./ListView";
import GalleryView from "./GalleryView";

function SubCategoriesList({
    id,
    userData,
    currentPage,
    setCurrentPage,
    catLoading,
    setCatLoading,
    selectedAttr,
    gallery,
}) {
    const [listData, setListData] = useState([
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
    ]);
    const [pagination, setPagination] = useState({});
    useEffect(() => {
        setCatLoading(true);
        const data = JSON.stringify({
            categoryId: id,
            pageSize: 30,
            pageNumber: currentPage,
            Attributes: selectedAttr,
        });
        console.log(data);
        const endpoint = `https://tt.delivera.uz/api/news/get-all`;
        axios({
            method: "post",
            url: endpoint,
            data: data,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`,
            },
        })
            .then((response) => {
                let pagination = JSON.parse(response.headers["x-pagination"]);
                console.log(response.data);
                setPagination(pagination);
                setListData(response.data);
                setCatLoading(false);
            })
            .catch((error) => {
                if (error.response.status == 401) {
                    message.info("Сессия истекла", 2);
                    dispatch({ type: "SIGN_IN" });
                }
                console.log(error.response, "error in categories");
            });
    }, [currentPage, selectedAttr]);
    return (
        <React.Fragment>
            <h1>Обычные объявления</h1>
            <span>
                Найдено объявлений:{" "}
                {pagination.TotalCount ? pagination.TotalCount : 0}
            </span>
            {gallery ? (
                <GalleryView
                    listData={listData}
                    pagination={pagination}
                    catLoading={catLoading}
                    setListData={setListData}
                    setCurrentPage={setCurrentPage}
                />
            ) : (
                <ListView
                    listData={listData}
                    pagination={pagination}
                    catLoading={catLoading}
                    setListData={setListData}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </React.Fragment>
    );
}

export default SubCategoriesList;
