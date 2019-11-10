import React from 'react'
import { Carousel } from 'antd';
import SliderPng from "../../../../images/slider.png";
import Magnifier from "react-magnifier";


function MyAdsCarousel() {
    function onChange(a, b, c) {
        console.log(a, b, c);
    }

    return (
        <Carousel afterChange={onChange}>
            <Magnifier src={SliderPng} />
            <Magnifier src={SliderPng} />
            <Magnifier src={SliderPng} />
        </Carousel>
    )
}

export default MyAdsCarousel
