import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ErrorBoundry from './ErrorBoundry';
import "./css/App.css";
import Postnavigator from "./components/header/Navigator";
import Navigator from "./components/header/Postnavigator";
import Home from "./components/home/Home";
import Other from "./components/home/Other";
import Foot from "./components/footer/Foot";
import { Layout } from 'antd';

const Test = React.lazy(() => import('./Test'));


function App() {
  return (
    <Router>
      <ErrorBoundry>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout className="layout">
            <Navigator />
            <Postnavigator />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/other" component={Other} />
            </Switch>
            <Foot />
          </Layout>
        </Suspense>
      </ErrorBoundry>
    </Router>
  )
}

export default App;