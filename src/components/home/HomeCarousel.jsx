import React, { useEffect } from 'react'
import { Carousel, Row, Col } from 'antd';
import SliderPng from "../../images/slider.png";
import UnderCarouselNews from './UnderCarouselNews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function HomeCarousel() {
    function onChange(a, b, c) {
        // console.log(a, b, c);
    }


    return (
        <div id="homecarousel">
            <div className="advertise-main">
                <Carousel autoplay afterChange={onChange}>
                    <img src={SliderPng} alt="" />
                    <img src={SliderPng} alt="" />
                    <img src={SliderPng} alt="" />
                </Carousel>
                <UnderCarouselNews />
            </div>
            <div className="fb-part">
                <div className="fb-group" data-href="https://www.facebook.com/groups/torguem.tut/" data-width="230" data-show-social-context="true" data-show-metadata="false"></div>
                <span style={{ marginTop: '12px', display: 'block', width: '100%' }}></span>
                <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fwww.tt.uz%2F&tabs&width=230&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=2496083423969818" width="230" height="214" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                <div style={{ background: 'white', paddingTop: '10px', paddingBottom: '10px', display: 'flex', justifyContent: 'space-around' }}>
                    <a target="_blank" href="https://t.me/ttuzbekistan" ><FontAwesomeIcon style={{ color: '#289ed9' }} size="4x" icon={['fab', 'telegram']} /></a>
                    <a target="_blank" href="https://www.youtube.com" ><FontAwesomeIcon style={{ color: '#ff0000' }} size="4x" icon={['fab', 'youtube']} /></a>
                </div>
            </div>
        </div>
    )
}


export default HomeCarousel


