  /**
   * Copyright Schrodinger, LLC
   */

  "use strict";

  import React from 'react';
  import appSyncConfig from "./aws-exports";
  import { ApolloProvider } from "react-apollo";
  import AWSAppSyncClient, { defaultDataIdFromObject } from "aws-appsync";
  import { Rehydrated } from "aws-appsync-react";

  import MainPage from './MainPage.js'
  
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