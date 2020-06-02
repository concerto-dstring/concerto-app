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

  import { Switch, Route, Redirect } from 'react-router-dom';
  import MainPage from './MainPage.js';
  import Login from './Login'
  import Register from './Register'
  import RegisterValidate from './RegisterValidate'

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

 class MainComponent extends React.Component {
    render() {
      let dataset = new MainTableDataStore()
      return (
        <ApolloProvider client={client}>
          <Rehydrated>
              <MainPage dataset={dataset} />
          </Rehydrated>
        </ApolloProvider>
      )
    }
  }

  class App extends React.Component {
    
    render() {

      return (
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/board" component={MainComponent} />
          <Route path="/dashboard" exact component={MainComponent} />
          <Route path="/register" exact component={Register} />
          <Route path="/register/validate" exact component={RegisterValidate} />
          <Redirect to="/login" from='/' exact />
        </Switch>
      )
        
    }
  }

  export default App;