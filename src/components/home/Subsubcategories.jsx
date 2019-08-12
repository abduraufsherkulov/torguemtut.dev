import React from 'react';


function Subsubcategories() {
    return (
        <React.Fragment>
            {
                subcat.subsubcategory.map((subsubcat, index) => (
                    <li key={index}><a>{subsubcat.title}</a><span>{subsubcat.count}</span></li>
                ))
            }
        </React.Fragment>
    )
}


export default Subsubcategories;