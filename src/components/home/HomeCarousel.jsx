import React from 'react'
import { Carousel } from 'antd';
import SliderPng from "../../images/slider.png";
function HomeCarousel() {
    function onChange(a, b, c) {
        console.log(a, b, c);
    }
    return (
        <div id="homecarousel">
            <Carousel afterChange={onChange}>
                <img src={SliderPng} alt="" />
                <img src={SliderPng} alt="" />
                <img src={SliderPng} alt="" />
            </Carousel>
        </div>
    )
}

export default HomeCarousel


