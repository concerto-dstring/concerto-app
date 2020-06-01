import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './MainPage.js';
import Login from './Login'

export default (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/board" component={MainPage} />
      <Route path="/dashboard" component={MainPage} />
    </Switch>
  );