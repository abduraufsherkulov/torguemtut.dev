import React from 'react'
import { Carousel } from 'antd';
import SliderPng from "../../../images/slider.png";


function DetailsCarousel() {
    function onChange(a, b, c) {
        console.log(a, b, c);
    }

    return (
        <Carousel afterChange={onChange}>
            <img src={SliderPng} alt="" />
            <img src={SliderPng} alt="" />
            <img src={SliderPng} alt="" />
        </Carousel>
    )
}

export default DetailsCarousel
