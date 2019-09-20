import React from 'react'
import TopCategories from './TopCategories'
import HomeCarousel from './HomeCarousel'

function CategoriesAndSlider() {
    return (

        <div id="categoriesandslider">
            <div className="container">
                <div className="under-cont">
                    <TopCategories />
                    <HomeCarousel />
                </div>
            </div>
        </div>
    )
}

export default CategoriesAndSlider
