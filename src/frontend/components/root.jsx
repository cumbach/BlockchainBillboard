import React from 'react';
import {
  Route,
  // Redirect,
  // Switch,
  // Link,
  // BrowserRouter
} from 'react-router-dom';

import ProjectsIndexContainer from './projects_index_container';


const Root = () => (
  <div className="outer-main-container">
      <Route exact path="/" component={ProjectsIndexContainer} />
  </div>
);

export default Root;
