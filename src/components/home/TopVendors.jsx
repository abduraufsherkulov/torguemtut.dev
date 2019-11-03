import React, { useState } from 'react'
import Logo from "../../images/mainlogo.png";
import { Row, Col } from 'antd';
import Malibu from "../../images/malibu.png";
import Fridge from "../../images/fridge.png";
import House from "../../images/house.png";
import HeartIcons from '../Icons/HeartIcons';



function TopVendors() {

function rand(){
    let img = [Malibu, Fridge, House];
    return img[Math.floor(Math.random() * img.length)];
}
    return (
        <div id="top-vendors">
            <div className="top-vendor-top">
                <div className="container">
                    <div className="top-vendor-title">
                        <img src={Logo} alt="" />
                        {/* <a style={{ visibility: "hidden" }} href="">Как сюда попасть?</a> */}
                        <h1>Популярные</h1>
                        <img src={Logo} style={{ visibility: "hidden" }} alt="" />
                    </div>
                </div>
            </div>
            <div className="top-vendor-grid">
                <div className="container">
                    <Row justify="space-between" type="flex" className="mainrows">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index, key) => (
                            <Col key={key} className="each">
                                <div className="img-part"><a href="">
                                    <div className="vip-face">
                                        <HeartIcons />
                                    </div>
                                    <img src={rand()} alt="" /></a>
                                </div>
                                <div className="info-part">
                                    <h1>{index * 10} y.e.</h1>
                                    <p>Smart Watch A1 Black</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default TopVendors;