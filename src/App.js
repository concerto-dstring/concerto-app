  /**
   * Copyright Schrodinger, LLC
   */

  "use strict";

  import React from 'react';
  import appSyncConfig from "./aws-exports";
  import { ApolloProvider } from "react-apollo";
  import AWSAppSyncClient, { defaultDataIdFromObject } from "aws-appsync";
  import { Rehydrated } from "aws-appsync-react";
  import gql from "graphql-tag";
  import { Auth } from 'aws-amplify';

  import MainPage from './MainPage.js'
  import MainTableDataStore from './maintable/MainTableDataStore';
  import { listCompanys } from "./graphql/queries"
  import { createUser, deleteUser, createBoard, createGroup, createCompany } from "./graphql/mutations"
  import { createStructuredSelector } from 'reselect';

  import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

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

  class App extends React.Component {

;    render() {
      let userinfo;

      Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then(user => {userinfo=user;  console.log(userinfo.attributes.sub);})
      .catch(err => console.log(err));

      let dataset = new MainTableDataStore();
      dataset.getCurrentUser(client, '4e8e53bc-80d7-4f4e-af84-704a737c9e98')
      return (
        <ApolloProvider client={client}>
          <Rehydrated>
              <AmplifySignOut />
              <MainPage dataset={dataset} />
          </Rehydrated>
        </ApolloProvider> 
      );
    }
  }

  export default withAuthenticator(App, {includeGreetings:true});