import React, { useContext, useEffect } from 'react';

import styled from "styled-components";
import {
  Switch,
  Route,
  withRouter,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Home from "./home/Home";
import Tariff from "./tariffs/Tariff";
import Login from "./auth/login/Login";
import SignUp from "./auth/signup/SignUp";
import Foot from "./footer/Foot";
import { AuthContext } from '../contexts/AuthContext';
import SideBar from './personal/SideBar';
import DownloadApplication from './application/DownloadApplication';
import SupportService from './help/SupportService';
import Disputes from './help/Disputes';
import MainBusiness from './personal/business/MainBusiness';
import MainWallet from './personal/wallet/MainWallet';
import { BalanceContext } from '../contexts/BalanceContext';
import AddNewsAd from './news/adnews/AddNewsAd';
import BoostAd from './news/boostad/BoostAd';
import DetailsMain from './news/detailsnews/DetailsMain';
import MainList from './news/subcategories/MainList';
import MyAdsInfoMain from './personal/myads/myadsinfo/MyAdsInfoMain';
import NoMatch from './NoMatch';
import RatingVendors from './ratingvendors/RatingVendors';
import VendorSideBar from './vendor/VendorSideBar';
import ForgotPassword from './auth/forgotpass/ForgotPassword';
import PrivacyPolicy from './footer/PrivacyPolicy';
import HowPay from './footer/HowPay';
import EditNewsAd from './personal/myads/editads/EditNewsAd';

function PrivateRoute({ children, ...rest }) {
  const { userData } = useContext(AuthContext);
  console.log('called private')
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData.token ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}


function AuthRoute({ children, ...rest }) {
  const { userData } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData.token ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        ) : (
            children
          )
      }
    />
  );
}



function Container({ location }) {
  return (
    <Wrapper>
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames="fade"
        >
          <section className="route-section">
            <Switch location={location}>


              <Route exact path="/">
                <Home />
              </Route>


              <Route exact path="/privacypolicy">
                <PrivacyPolicy />
              </Route>

              <Route exact path="/howpay">
                <HowPay />
              </Route>

              <Route exact path="/ratings">
                <RatingVendors />
              </Route>

              <Route exact path="/subcategories/:id">
                <MainList />
              </Route>
              {/* Needed query */}
              {/* <Route exact path="/subcategories/:id">
                <MainList />
              </Route> */}

              <Route exact path="/boostad/:id">
                <BoostAd />
              </Route>

              <Route exact path="/item/:id">
                <DetailsMain />
              </Route>

              <Route exact path="/myads/:id">
                <MyAdsInfoMain />
              </Route>

              <Route path="/tariff">
                <Tariff />
              </Route>
              <Route path="/support">
                <SupportService />
              </Route>
              <Route path="/application">
                <DownloadApplication />
              </Route>

              <AuthRoute path="/login">
                <Login />
              </AuthRoute>
              <AuthRoute path="/signup">
                <SignUp />
              </AuthRoute>
              <AuthRoute path="/forgot">
                <ForgotPassword />
              </AuthRoute>

              <PrivateRoute path="/disputes">
                <Disputes />
              </PrivateRoute>
              <PrivateRoute path="/add-news-ad">
                <AddNewsAd />
              </PrivateRoute>
              <PrivateRoute path="/wishlist">
                <SideBar />
              </PrivateRoute>
              <PrivateRoute path="/myads">
                <SideBar />
              </PrivateRoute>
              <PrivateRoute path="/settings">
                <SideBar />
              </PrivateRoute>
              <PrivateRoute path="/business">
                <SideBar />
              </PrivateRoute>
              <PrivateRoute path="/wallet">
                <SideBar />
              </PrivateRoute>

              <Route exact path="/vendorproducts/:id">
                <VendorSideBar />
              </Route>
              <Route exact path="/vendorratings/:id">
                <VendorSideBar />
              </Route>
              <Route exact path="/vendorstatistics/:id">
                <VendorSideBar />
              </Route>

              <PrivateRoute path="/edit-ads/:id">
                <EditNewsAd />
              </PrivateRoute>

              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
            <Foot />
          </section>
        </CSSTransition>
      </TransitionGroup>
    </Wrapper >
  )
}
const Wrapper = styled.div`
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }

  div.transition-group {
    position: relative;
  }

  section.route-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
`;
export default withRouter(Container);
