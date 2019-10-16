const google = window.google;
import React, { useEffect } from 'react'
import { Icon, Button } from 'antd';
import axios from 'axios';

function FacebookWith() {
    function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
        console.log(response);                   // The current login status of the person.
        if (response.status === 'connected') {   // Logged into your webpage and Facebook.
            sendToServer(response)
            testAPI();
        } else {                                 // Not logged into your webpage or we are unable to tell.
            FB.login(function (response) {
                console.log(response);
                if (response.authResponse) {
                    sendToServer(response);
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', function (response) {
                        console.log(response);
                        console.log('Good to see you, ' + response.name + '.');
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, { scope: 'email' });
            // user_birthday, user_gender, user_location,
        }
    }

    function checkLoginState() {               // Called when a person is finished with the Login Button.
        FB.getLoginStatus(function (response) {   // See the onlogin handler
            statusChangeCallback(response);
        });
    }

    function sendToServer(response) {
        const endpoint = "https://ttuz.azurewebsites.net/api/users/facebook";

        const data = JSON.stringify({
            access_token: response.authResponse.accessToken
        });

        axios({
            method: "post",
            url: endpoint,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error, "error on refresh");
            });
    }

    function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
        console.log('Welcome!  Fetching your information.... ');

        FB.api('/me', function (response) {
            console.log('Successful login for: ' + response.name);
            console.log('Thanks for logging in, ' + response.name + '!');
        });
    }

    function statusHandleLogOut() {
        FB.getLoginStatus(function (response) {   // See the onlogin handler
            handleLogOut(response);
        });
    }

    function handleLogOut() {
        FB.logout(function (response) {
            console.log(response)
            if (response.authResponse) {
                console.log('Log out');
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    }

    useEffect(() => {
        window.fbAsyncInit = function () {
            FB.init({
                appId: '2496083423969818',
                cookie: true,                     // Enable cookies to allow the server to access the session.
                xfbml: true,                     // Parse social plugins on this webpage.
                version: 'v4.0'           // Use this Graph API version for this call.
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
        }(document, 'script', 'facebook-jssdk'));

    }, [])
    return (
        <>
            <Button onClick={checkLoginState}>Facebook login</Button>
            <Button onClick={statusHandleLogOut}>Log out</Button>
        </>
    )
}

export default FacebookWith
