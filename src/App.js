import React, { Suspense, useState } from "react";
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
if (process.env.NODE_ENV === 'development') {
  import('./sass/styles.scss');
  import("./sass/fonts.scss");
}
function App() {
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
                        <Postnavigator />
                        <Navigator />
                        <Container />
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