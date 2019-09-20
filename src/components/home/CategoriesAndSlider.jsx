import React from 'react'
import TopCategories from './TopCategories'
import HomeCarousel from './HomeCarousel'

function CategoriesAndSlider() {
    return (

        <div id="categoriesandslider">
            <div className="container">
                <TopCategories />
                <HomeCarousel />
            </div>
        </div>
    )
}

export default CategoriesAndSlider
