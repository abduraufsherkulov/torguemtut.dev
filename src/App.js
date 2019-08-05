import React, { Suspense, useState } from "react";
import ErrorBoundry from './ErrorBoundry';
import "./css/App.css";
import { Button } from 'antd';
// import Button from 'antd/es/button';
// import 'antd/es/button/style';

const Test = React.lazy(() => import('./Test'));


function App() {
  return (
    <div className="App">
      <ErrorBoundry>
      <Suspense fallback={<div>Loading...</div>}>
      <Button type="primary">Button</Button>
        <h1> Hello, World!!!!</h1>
        <Test />
      </Suspense>
      </ErrorBoundry>
    </div>
  )
}

export default App;