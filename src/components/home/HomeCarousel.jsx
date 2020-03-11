import React, { useEffect } from 'react'
import { Carousel, Row, Col } from 'antd';
import SliderPng from "../../images/slider.png";
import UnderCarouselNews from './UnderCarouselNews';
function HomeCarousel() {
    function onChange(a, b, c) {
        // console.log(a, b, c);
    }
    useEffect(() => {
        window.fbAsyncInit = function () {
            FB.init({
                appId: '656151361204007',
                cookie: true,                     // Enable cookies to allow the server to access the session.
                xfbml: true,                     // Parse social plugins on this webpage.
                version: 'v6.0'           // Use this Graph API version for this call.
            });


            // FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
            //     statusChangeCallback(response);        // Returns the login status.
            // });
        };


        (function (d, s, id) {                      // Load the SDK asynchronously
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'))
    }, [])

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?7";
        script.setAttribute("data-telegram-post", "ttuzelon/1702");
        script.setAttribute("data-width", "100%");
        script.setAttribute("data-userpic", "auto");
        script.async = true;
        let tg = document.getElementById('telegram-widget');
        tg.appendChild(script);
    }, [])
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
                <div className="fb-group" data-href="https://www.facebook.com/groups/torguem.tut/" data-width="320" data-show-social-context="true" data-show-metadata="false"></div>
                <span style={{ marginTop: '12px', display: 'block', width: '100%' }}></span>
                <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fwww.tt.uz%2F&tabs=timeline&width=321&height=170&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=292801224405886" width="100%" height="170" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                <div style={{ width: '321px', background: 'white' }} id="telegram-widget"></div>
            </div>
        </div>
    )
}


export default HomeCarousel


