import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import ErrorBoundry from './ErrorBoundry';
import Navigator from "./components/header/Navigator";
import Postnavigator from "./components/header/Postnavigator";
import { Layout } from 'antd';
import Container from "./components/Container";
import AuthContextProvider from "./contexts/AuthContext";
import CategoryContextProvider from "./contexts/CategoryContext";
import BalanceContextProvider from "./contexts/BalanceContext";
import MyAdsProvider from "./contexts/MyAdsContext";
import WishlistContextProvider from "./contexts/WishlistContext";
import WishlistVendorContextProvider from "./contexts/WishlistVendorContext";
import CommentContextProvider from "./contexts/CommentContext";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBlender, faCar, faHome, faGraduationCap, faLaptop, faMobileAlt, faCameraRetro, faTshirt, faCouch, faDraftingCompass, faHardHat, faClipboardCheck, faHandHoldingUsd, faBabyCarriage, faPaw, faGifts, faBook, faPalette, faTableTennis, faHeartbeat, faBinoculars, faArchive, faUsers } from '@fortawesome/free-solid-svg-icons'
import SoataContextProvider from "./contexts/SoataContext";
import UserInfoContextProvider from "./contexts/UserInfoContext";
import BusinessContextProvider from "./contexts/BusinessContext";
import { fblogin } from "./helpers/SocialLoginHelper";

library.add(fab, faBlender, faCar, faHome, faGraduationCap, faLaptop, faMobileAlt, faCameraRetro, faTshirt, faCouch, faDraftingCompass, faHardHat, faClipboardCheck, faHandHoldingUsd, faBabyCarriage, faPaw, faGifts, faBook, faPalette, faTableTennis, faHeartbeat, faBinoculars, faArchive, faUsers);

if (process.env.NODE_ENV === 'development') {
  import('./sass/styles.scss');
  import("./sass/fonts.scss");
}

function App() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: fblogin,
        cookie: true,                     // Enable cookies to allow the server to access the session.
        xfbml: true,                     // Parse social plugins on this webpage.
        version: 'v6.0',           // Use this Graph API version for this call.
        autoLogAppEvents: true
      });


      // FB.getLoginStatus(function (response) {   // Called after the JS SDK has been initialized.
      //     statusChangeCallback(response);        // Returns the login status.
      // });
    };


    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=656151361204007&autoLogAppEvents=1';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, [])

  return (
    <Router keyLength={12}>
      <ErrorBoundry>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout className="layout">
            <AuthContextProvider>
              <CategoryContextProvider>
                <BalanceContextProvider>
                  <MyAdsProvider>
                    <WishlistContextProvider>
                      <WishlistVendorContextProvider>
                        <CommentContextProvider>
                          <SoataContextProvider>
                            <UserInfoContextProvider>
                              <BusinessContextProvider>
                                <Postnavigator />
                                <Navigator />
                                <Container />
                              </BusinessContextProvider>
                            </UserInfoContextProvider>
                          </SoataContextProvider>
                        </CommentContextProvider>
                      </WishlistVendorContextProvider>
                    </WishlistContextProvider>
                  </MyAdsProvider>
                </BalanceContextProvider>
              </CategoryContextProvider>
            </AuthContextProvider>
          </Layout>
        </Suspense>
      </ErrorBoundry>
    </Router>
  )
}

export default App;