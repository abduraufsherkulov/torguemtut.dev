import React from 'react'
import TopCategories from './TopCategories'
import HomeCarousel from './HomeCarousel'
import FloatingCategories from './FloatingCategories';

function CategoriesAndSlider() {
    return (

        <div id="categoriesandslider">
            <div className="container">
                <FloatingCategories />
                {/* <div className="under-cont">
                    <TopCategories />
                    <HomeCarousel />
                </div> */}
            </div>
        </div>
    )
}

export default CategoriesAndSlider
