import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { createBrowserHistory } from "history";
import ErrorBoundry from './ErrorBoundry';
import Postnavigator from "./components/header/Navigator";
import Navigator from "./components/header/Postnavigator";
import { Layout } from 'antd';
import Container from "./components/Container";
if (process.env.NODE_ENV === 'development') {
  import('./sass/styles.scss');
  import("./sass/fonts.scss");
}
const history = createBrowserHistory()
function App() {
  return (
    <Router  keyLength={12}>
      <ErrorBoundry>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout className="layout">
            <Navigator />
            <Postnavigator />
            <Container />
          </Layout>
        </Suspense>
      </ErrorBoundry>
    </Router>
  )
}

export default App;