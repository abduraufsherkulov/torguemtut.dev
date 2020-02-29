import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { CategoryContext } from '../../contexts/CategoryContext';
import { UnorderedListOutlined } from '@ant-design/icons';




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
                            <div className="sub-cate-row" key={index}>
                                <dl className="sub-cate-items">
                                    <dt><a href="#">{num.label}</a></dt>
                                    {num.children.length > 0 ? num.children.map((ok, index) =>
                                        <dd key={index}><Link to={`/subcategories/${ok.value}`}>{ok.label}</Link></dd>
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
    console.log(category);
    return (
        <div id="topcategories">
            <div className="categories-main">
                <div className="categories-content-title"><a href="#"> <UnorderedListOutlined /><span>Категории</span> <i></i> </a></div>

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
