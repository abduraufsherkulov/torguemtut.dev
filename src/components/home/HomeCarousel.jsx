import React from 'react'
import { Carousel, Row, Col } from 'antd';
import SliderPng from "../../images/slider.png";
function HomeCarousel() {
    function onChange(a, b, c) {
        console.log(a, b, c);
    }
    return (
        <div id="homecarousel">
            <div className="advertise-main">
                <Carousel afterChange={onChange}>
                    <img src={SliderPng} alt="" />
                    <img src={SliderPng} alt="" />
                    <img src={SliderPng} alt="" />
                </Carousel>
            </div>
            <div className="fb-part">
                <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fartbazaaruzb%2F&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=2496083423969818" width="100%" height="258" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
        </div>
    )
}


export default HomeCarousel


