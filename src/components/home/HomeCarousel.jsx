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
                <div className="down-promotion">
                    <Row type="flex" justify="space-between">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((k, i) => (
                            <Col key={k}>
                                <div className="crowd-container">
                                    <div className="crowd-img">
                                        <img src="//ae01.alicdn.com/kf/H44270036a201444eaff9af72aaf84556z.jpg_140x140.jpg_.webp" />
                                    </div>
                                    <div className="crowd-note">
                                        <div className="crowd-price">US $33.73</div>
                                    </div>
                                    <div className="crowd-title" title="">Гуру гаджетов</div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <div className="fb-part">
                <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fartbazaaruzb%2F&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=2496083423969818" width="100%" height="810" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
        </div>
    )
}


export default HomeCarousel


