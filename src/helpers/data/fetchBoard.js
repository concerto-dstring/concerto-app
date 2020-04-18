  import React, { Component } from "react";
  import { Link } from "react-router-dom";
  import API, { graphqlOperation } from '@aws-amplify/api'
  import PubSub from '@aws-amplify/pubsub';

  import awsconfig from '../../aws-exports';
  import { getBoard, listBoards } from "../../graphql/queries"

  API.configure(awsconfig);
  PubSub.configure(awsconfig);

  listBoards = async () => {
    const data = await API.graphql(graphqlOperation(listBoard))
    console.log('list boards successfully fetched', data)
  }

  getBoard = async () => {
    const data = await API.graphql(graphqlOperation(getBoard, { id: this.props.boardID }))
    console.log('board successfully fetched', data)
  }