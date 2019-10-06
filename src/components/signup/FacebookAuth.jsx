import React, { useState, useEffect } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Icon, Button } from 'antd';


function FacebookAuth() {
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [userID, setuserID] = useState("");
    const [name, setname] = useState("");
    const [email, setemail] = useState("")
    const [picture, setpicture] = useState("")

    const responseFacebook = (response) => {
        console.log(response);
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
                console.log('Good to see you, ' + response.name + '.');
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
        setisLoggedIn(true);
        setuserID(response.userID);
        setname(response.name);
        setemail(response.email);
        setpicture(response.picture.data.url);
        FB.getLoginStatus(function (response) {
            console.log(response);
        });
    }

    const componentClicked = () => {

    }

    function logOut(e) {
        e.preventDefault();
        FB.logout(function (response) {
            console.log(response);
        });
    }

    function checkStatus(e) {
        e.preventDefault();
        // FB.logout(function (response) {
        //     console.log(response);
        // });
        FB.getLoginStatus(function (response) {
            console.log(response);

            FB.api(
                `/${response.authResponse.userID}/permissions`,
                "DELETE",
                function (response) {
                    if (response && !response.error) {
                        console.log(response);
                    }
                }
            );
        });
    }

    let fbContent;

    fbContent = isLoggedIn ?
        (
            <div>
                <img src={picture} alt="" />
            </div>) : (
            <FacebookLogin
                appId="2496083423969818"
                autoLoad={false}
                size="small"
                textButton="Facebook"
                icon={<Icon type="facebook" />}
                fields="name,email,picture"
                onClick={componentClicked}
                cookie={true}
                version="4.0"
                scope="public_profile"
                callback={responseFacebook}
                render={renderProps => (
                    <Button onClick={renderProps.onClick}>This is my custom FB button</Button>
                )}
            />
        )


    return (
        <>
            <Button onClick={(e) => checkStatus(e)}>checkStatus</Button>
            <Button onClick={(e) => logOut(e)}>logout</Button>
            {fbContent}
        </>
    )
}

export default FacebookAuth
