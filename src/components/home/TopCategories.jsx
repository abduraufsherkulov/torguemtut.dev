import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { CategoryContext } from '../../contexts/CategoryContext';
import { Icon } from 'antd'




function EachCat(props) {

    const [unfold, setUnfold] = useState(false)

    let hoverMe = unfold ? "cl-item cl-item-unfold" : "cl-item";

    function handleEnter() {
        setUnfold(true);
    }

    function handleLeave() {
        setUnfold(false);
    }
    return (
        <dl className={hoverMe} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <dt className="cate-name" >
                <span>
                    <a>{props.cat.label}</a>
                </span>
            </dt>
            <dd className="sub-cate">
                <div className="sub-cate-main">
                    <div className="sub-cate-content">
                        {props.cat.children.map((num, index) =>
                            <div className="sub-cate-row">
                                <dl className="sub-cate-items">
                                    <dt><a href="#">{num.label}</a></dt>
                                    {num.children.length > 0 ? num.children.map((ok) =>
                                        <dd><a href="#">{ok.label}</a></dd>
                                    ) : null}
                                </dl>
                            </div>
                        )}
                    </div>
                </div>
            </dd>
        </dl>
    )
}

function TopCategories(props) {
    const { category } = useContext(CategoryContext)

    // const [category, setCategory] = useState([]);

    // useEffect(() => {
    //     const endpoint = "https://ttuz.azurewebsites.net/api/category/get-all";
    //     axios({
    //         method: "get",
    //         url: endpoint,
    //         //   auth: {
    //         //     username: "delivera",
    //         //     password: "X19WkHHupFJBPsMRPCJwTbv09yCD50E2"
    //         //   },
    //         //   headers: {
    //         //     "content-type": "application/json",
    //         //     token: token
    //         //   }
    //     })
    //         .then(response => {
    //             // console.log(response.data);
    //             setCategory(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error, "error in categories");
    //         });

    // }, []);


    return (
        <div id="topcategories">
            <div className="categories-main">
                <div className="categories-content-title"><a href="#"> <Icon type="unordered-list" /><span>Категории</span> <i></i> </a></div>

                <div className="categories-list-box">
                    {category.map((cat, index) => {
                        if (cat.parentId == null) {
                            return (
                                <EachCat key={index} cat={cat} />
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default withRouter(TopCategories)
