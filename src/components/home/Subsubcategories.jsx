import React from 'react';


function Subsubcategories(props) {
    return (
        <li><a>{props.subsubcat.title}</a><span>{props.subsubcat.count}</span></li>
    )
}


export default Subsubcategories;