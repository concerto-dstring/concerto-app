  /**
   * Copyright Schrodinger, LLC
   */

  "use strict";

  import React,  { useState, useEffect } from 'react';
  import appSyncConfig from "./aws-exports";
  import { ApolloProvider } from "react-apollo";
  import AWSAppSyncClient, { defaultDataIdFromObject } from "aws-appsync";
  import { Rehydrated } from "aws-appsync-react";
  import gql from "graphql-tag";
  import { Auth } from 'aws-amplify';
 
  import MainTableDataStore from './maintable/MainTableDataStore';

  import { AmplifySignOut } from '@aws-amplify/ui-react'

  import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
  import MainPage from './MainPage.js';
  import Login from './Login'
  import Register from './Register'
  import RegisterValidate from './RegisterValidate'
  import { ForgetPassword } from './ForgetPassword'
import NotFound from './NotFound';

  /* AWSAppSyncClient integrates with the Apollo Client for GraphQL */
  const client = new AWSAppSyncClient({
    url: appSyncConfig.aws_appsync_graphqlEndpoint,
    region: appSyncConfig.aws_appsync_region,
    auth: {
      type: appSyncConfig.aws_appsync_authenticationType,
      apiKey: appSyncConfig.aws_appsync_apiKey,
    },
    cacheOptions: {
    },
  });

  @withRouter
 class MainComponent extends React.Component {

    render() {
      let dataset = new MainTableDataStore();
      return (
        <ApolloProvider client={client}>
          <Rehydrated>
              <MainPage dataset={dataset}/>
          </Rehydrated>
        </ApolloProvider>
      )
    }
  }

  @withRouter
  class App extends React.Component {

    componentDidMount() {
      this.getCurrentAuthUser()
    }

    getCurrentAuthUser = async() => {
      try {
        let user = await Auth.currentAuthenticatedUser({
          bypassCache: false
        })
        // 如果是登录页面或者/则跳转到board
        localStorage.setItem('CurrentUserId', user.attributes.sub);
        if (this.props.location.pathname === '/' || this.props.location.pathname === '/login') {
          this.props.history.push('/board')
        }
      } catch (error) {
        // 检查用户是否登录
        this.props.history.push('/login')
      }
    }
    
    render() {

      return (
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route exact path="/board" component={MainComponent} />
          <Route exact path="/board/:id" component={MainComponent} />
          <Route path="/dashboard" exact component={MainComponent} />
          <Route path="/register" exact component={Register} />
          <Route path="/register/validate" exact component={RegisterValidate} />
          <Route path="/forget" exact component={ForgetPassword} />
          <Route path="/notfound" exact component={NotFound} />
          <Redirect to="/login" from='/' exact />
          <Redirect to="/notfound" />
        </Switch>
      )
        
    }
  }

  export default App;