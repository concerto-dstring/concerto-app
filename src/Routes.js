import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './MainPage.js'

export default (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/board" component={MainPage} />
      <Route path="/dashboard" component={MainPage} />
    </Switch>
  );