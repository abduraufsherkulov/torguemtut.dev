import React from 'react';
import Subsubcategories from './Subsubcategories';


function Subcategories() {
    return (
        <li>
            <a className={active ? "active" : ""} onClick={_togle}>{subcat.title}</a><span>{subcat.count}</span>
            <ul style={{ maxHeight: active ? subref.current.scrollHeight : 0 }} ref={subref} className="sub-sub-categories">
                {subcat.subsubcategory.map((subsubcat, index) => (
                   <Subsubcategories subsubcat={subsubcat} key={index} />
                ))}
            </ul>
        </li>
    )
}


export default Subcategories;