import React, { useContext } from 'react';

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
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import Foot from "./footer/Foot";
import AddNewsAd from './addnewsad/AddNewsAd';
import WishList from './personal/WishList';
import { authReducer } from '../reducers/AuthReducer';
import { AuthContext } from '../contexts/AuthContext';
import SideBar from './personal/SideBar';

function PrivateRoute({ children, ...rest }) {
  
  const { username } = useContext(AuthContext);
  console.log('called private')
  return (
    <Route
      {...rest}
      render={({ location }) =>
        username ? (
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
  const { username } = useContext(AuthContext);
  // console.log(username);
  console.log('called')
  return (
    <Route
      {...rest}
      render={({ location }) =>
        username ? (
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
              <Route path="/tariff">
                <Tariff />
              </Route>
              <AuthRoute path="/login">
                <Login />
              </AuthRoute>
              <AuthRoute path="/signup">
                <SignUp />
              </AuthRoute>
              <PrivateRoute path="/add-news-ad">
                <AddNewsAd />
              </PrivateRoute>
              <PrivateRoute path="/wishlist">
                <SideBar />
              </PrivateRoute>
              
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
