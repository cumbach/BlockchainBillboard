import React from 'react';
import {
  Route,
  // Redirect,
  // Switch,
  // Link,
  // BrowserRouter
} from 'react-router-dom';

import MainApplicationContainer from './main_application_container';


const Root = () => (
  <div className="outer-main-container">
      <Route exact path="/" component={MainApplicationContainer} />
  </div>
);

export default Root;
