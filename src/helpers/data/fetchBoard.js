  /**
   * TODO:  in yarn.lock exists below dependency:
        amplify-js-app ==> bulky-ui "^1.0.1  ==>   antd "^3.26.0" ==> "@ant-design/icons" "~2.1.1"

        and "@ant-design/icons" "~2.1.1" do not have our codes required resource like "AccountBookOutlined'
        current I removed the amplify-js-app package.
   */

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