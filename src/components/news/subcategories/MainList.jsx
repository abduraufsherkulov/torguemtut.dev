import { List, Avatar, Skeleton, message } from 'antd';
import { useParams } from 'react-router-dom';
import React, { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import HeartIcons from '../../Icons/HeartIcons';
import moment from 'moment';
import SubcategoriesFilter from './SubcategoriesFilter';
import SubCategoriesList from './SubCategoriesList';
import VipInCategories from './VipInCategories';
moment.locale('ru')


function MainList() {

    const { userData, dispatch } = useContext(AuthContext)
    const [currentPage, setCurrentPage] = useState(1);
    const [vipLoading, setVipLoading] = useState(true)
    const [catLoading, setCatLoading] = useState(true)
    const [selectedAttr, setSelectedAttr] = useState([]);

    let { id } = useParams();

    return (
        <div className="container">
            <div className="filtration">
                <SubcategoriesFilter setSelectedAttr={setSelectedAttr} selectedAttr={selectedAttr} catId={id} />
            </div>
            <div id="mainlist">
                <VipInCategories vipLoading={vipLoading} setVipLoading={setVipLoading} id={id} userData={userData} />
                <SubCategoriesList
                    setSelectedAttr={setSelectedAttr}
                    selectedAttr={selectedAttr}
                    catLoading={catLoading}
                    setCatLoading={setCatLoading}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    userData={userData}
                    id={id} />
            </div>
        </div>
    )
}
export default withRouter(MainList)
