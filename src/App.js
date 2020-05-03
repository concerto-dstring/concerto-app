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
  import { createUser, deleteUser, createBoard, createGroup, createCompany } from "./graphql/mutations"
import { createStructuredSelector } from 'reselect';

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

  // Input types can't have fields that are other objects, only basic scalar types, list types, and other input types.
  // const newuser = {
  //   email: "admin@pynbo.com", fname: "steve", lname: "zhang", usertype: "ADMIN", createdAt: "2020-04-25T21:37:47.463Z", id: "001",
  //   title:"partne", phone:"123-456-789"
  // }
  // const myvariables = {
  //   input: newuser, // key is "input" based on the mutation above
  // };
  // client.mutate({
  //   mutation: gql(createUser),
  //   variables : myvariables
  // }).then(result => console.log(result)).catch(console.error);

  // const deluser = {
  //   id: "0012"  }
  // const myvariable2 = {
  //   input: deluser, // key is "input" based on the mutation above
  // };
  // client.mutate({
  //   mutation: gql(deleteUser),
  //   variables : myvariable2
  // }).then(result => console.log(result)).catch(console.error);

  // Input types can't have fields that are other objects, only basic scalar types, list types, and other input types.
  // const newcompany = {
  //   name: "pynbo",
  //   email: "admin@pynbo.com",
  //   phone: "123-4567-89",
  //   createdAt: "2020-04-25T21:37:47.463Z"
  // }
  // const myvariables = {
  //   input: newcompany, // key is "input" based on the mutation above
  // };
  // client.mutate({
  //   mutation: gql(createCompany),
  //   variables : myvariables
  // }).then(result => console.log(result)).catch(console.error);

  // const newboard = {
  //   createdAt: "2020-04-25T21:37:47.463Z", id: "001",
  //   name:"board1",
  //   boardCreatorId: "001"
  // }
  // const myvariables = {
  //   input: newboard,
  // };
  // client.mutate({
  //   mutation: gql(createBoard),
  //   variables : myvariables
  // }).then(result => console.log(result)).catch(console.error);

  // const newgroup = {
  //   createdAt:"2020-04-25T21:37:47.463Z",
  //   groupBoardId: "001",
  //   name:"group2",
  //   rank:"00002",
  //   groupCreatorId: "001"
  // }
  // const myvariables = {
  //   input: newgroup,
  // };
  // client.mutate({
  //   mutation: gql(createGroup),
  //   variables : myvariables
  // }).then(result => console.log(result)).catch(console.error);



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