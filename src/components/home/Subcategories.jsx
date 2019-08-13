import React, { useState, useEffect, useRef } from 'react';
import Subsubcategories from './Subsubcategories';


function Subcategories(props) {
    const subref = useRef(null);
    const [active, setActive] = useState(false);
    function _togle() {
        setActive(!active);
    }
    return (
        <li>
            <a className={active ? "active" : ""} onClick={_togle}>{props.subcat.title}</a><span>{props.subcat.count}</span>
            <ul style={{ maxHeight: active ? subref.current.scrollHeight : 0 }} ref={subref} className="sub-sub-categories">
                {props.subcat.subsubcategory.map((subsubcat, index) => (
                    <Subsubcategories subsubcat={subsubcat} key={index} />
                ))}
            </ul>
        </li>
    )
}


export default Subcategories;