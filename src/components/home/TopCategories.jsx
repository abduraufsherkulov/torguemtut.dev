import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { CategoryContext } from '../../contexts/CategoryContext';





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
                    <a>{props.cat}</a>
                </span>
            </dt>
            <dd className="sub-cate">
                <div className="sub-cate-main">
                    <div className="sub-cate-content">
                        <div className="sub-cate-row">
                            <dl className="sub-cate-items">
                                <dt><a href="#">New Arrivals</a></dt>
                                <dd><a href="#">Dresses</a></dd>
                                <dd><a href="#">Blouses & Shirts</a></dd>
                                <dd><a href="#">Hoodies & Sweatshirts</a></dd>
                                <dd><a href="#">Beach style</a></dd>
                                <dd><a href="#">Suits & Sets</a></dd>
                                <dd><a href="#">Sweaters</a></dd>
                            </dl>
                            <dl className="sub-cate-items">
                                <dt><a href="#">New Arrivals</a></dt>
                                <dd><a href="#">Dresses</a></dd>
                                <dd><a href="#">Blouses & Shirts</a></dd>
                                <dd><a href="#">Hoodies & Sweatshirts</a></dd>
                                <dd><a href="#">Beach style</a></dd>
                                <dd><a href="#">Suits & Sets</a></dd>
                                <dd><a href="#">Sweaters</a></dd>
                            </dl>
                        </div>
                        <div className="sub-cate-row">
                            <dl className="sub-cate-items">
                                <dt><a href="#">New Arrivals</a></dt>
                                <dd><a href="#">Dresses</a></dd>
                                <dd><a href="#">Blouses & Shirts</a></dd>
                                <dd><a href="#">Hoodies & Sweatshirts</a></dd>
                                <dd><a href="#">Beach style</a></dd>
                                <dd><a href="#">Suits & Sets</a></dd>
                                <dd><a href="#">Sweaters</a></dd>
                            </dl>
                            <dl className="sub-cate-items">
                                <dt><a href="#">New Arrivals</a></dt>
                                <dd><a href="#">Dresses</a></dd>
                                <dd><a href="#">Blouses & Shirts</a></dd>
                                <dd><a href="#">Hoodies & Sweatshirts</a></dd>
                                <dd><a href="#">Beach style</a></dd>
                                <dd><a href="#">Suits & Sets</a></dd>
                                <dd><a href="#">Sweaters</a></dd>
                            </dl>
                        </div>

                        <div className="sub-cate-row">
                            <dl className="sub-cate-items">
                                <dt><a href="#">New Arrivals</a></dt>
                                <dd><a href="#">Dresses</a></dd>
                                <dd><a href="#">Blouses & Shirts</a></dd>
                                <dd><a href="#">Hoodies & Sweatshirts</a></dd>
                                <dd><a href="#">Beach style</a></dd>
                                <dd><a href="#">Suits & Sets</a></dd>
                                <dd><a href="#">Sweaters</a></dd>
                            </dl>
                            <dl className="sub-cate-items">
                                <dt><a href="#">New Arrivals</a></dt>
                                <dd><a href="#">Dresses</a></dd>
                                <dd><a href="#">Blouses & Shirts</a></dd>
                                <dd><a href="#">Hoodies & Sweatshirts</a></dd>
                                <dd><a href="#">Beach style</a></dd>
                                <dd><a href="#">Suits & Sets</a></dd>
                                <dd><a href="#">Sweaters</a></dd>
                            </dl>
                        </div>
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
                <div className="categories-content-title"><a href="#"> <span>Categories</span> <i></i> </a></div>

                <div className="categories-list-box">
                    {category.map((cat, index) => {
                        if (cat.parentId == null && index < 72) {
                            return (
                                <EachCat key={index} cat={cat.name} />
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default withRouter(TopCategories)
