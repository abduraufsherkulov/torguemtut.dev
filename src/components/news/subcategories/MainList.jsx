import { List, Avatar, Skeleton, message } from "antd";
import { useParams } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import HeartIcons from "../../Icons/HeartIcons";
import moment from "moment";
import SubcategoriesFilter from "./SubcategoriesFilter";
import SubCategoriesList from "./SubCategoriesList";
import VipInCategories from "./VipInCategories";
import TypeFilters from "./TypeFilters";
moment.locale("ru");

function MainList() {
    const { userData, dispatch } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [vipLoading, setVipLoading] = useState(true);
    const [catLoading, setCatLoading] = useState(true);
    const [selectedAttr, setSelectedAttr] = useState([]);

    const [gallery, setGallery] = useState(false);
    let { id } = useParams();

    const handleType = (val) => {
        setGallery(val);
    };
    return (
        <React.Fragment>
            <div
                style={{
                    width: "100%",
                    paddingTop: "32px",
                    background: "#f7f7f7",
                }}
            >
                <div className="container">
                    <div className="filtration">
                        <SubcategoriesFilter
                            setSelectedAttr={setSelectedAttr}
                            selectedAttr={selectedAttr}
                            catId={id}
                        />
                    </div>
                    <TypeFilters gallery={gallery} handleType={handleType} />
                </div>
            </div>
            <div className="container">
                <div id="mainlist">
                    <VipInCategories
                        setSelectedAttr={setSelectedAttr}
                        selectedAttr={selectedAttr}
                        vipLoading={vipLoading}
                        setVipLoading={setVipLoading}
                        id={id}
                        userData={userData}
                    />
                    <SubCategoriesList
                        gallery={gallery}
                        setSelectedAttr={setSelectedAttr}
                        selectedAttr={selectedAttr}
                        catLoading={catLoading}
                        setCatLoading={setCatLoading}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        userData={userData}
                        id={id}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}
export default withRouter(MainList);
