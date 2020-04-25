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

  import MainPage from './MainPage.js'
  
  import { listCompanys } from "./graphql/queries"

  /* AWSAppSyncClient integrates with the Apollo Client for GraphQL */
  const client = new AWSAppSyncClient({
    url: appSyncConfig.aws_appsync_graphqlEndpoint,
    region: appSyncConfig.aws_appsync_region,
    auth: {
      type: appSyncConfig.aws_appsync_authenticationType,
      apiKey: appSyncConfig.aws_appsync_apiKey,
    },
    cacheOptions: {
    }
  });

  /* a sample codes to use the client */
  console.log("start to run gql " + new Date().toISOString())
  client
    .query({
      query: gql(listCompanys)
    })
    .then(result => console.log(result));

  class App extends React.Component {
  
    render() {
      return (
        <ApolloProvider client={client}>
          <Rehydrated>
              <MainPage />
          </Rehydrated>
        </ApolloProvider> 
      );
    }
  }

  export default App;