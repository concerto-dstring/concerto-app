import React, { Component } from "react";
import { Query } from 'react-apollo'
import gql from "graphql-tag";

import { listBoards} from "../../graphql/queries"
import { onCreateBoard} from "../../graphql/subscriptions"


/* a sample codes to use the client */
class Board extends React.Component {

    componentDidMount() {
        this.props.subscribeToMore();
    }


    render() {
        const items = this.props.data.listBoardss.items;

        return items.map((board) => {
            return (
                <div>
                    <h1>{board.name}</h1>
                    <time dateTime={board.createdAt}>
                    {new Date(board.createdAt).toDateString()}</time>
                    <br />
                </div>

            )
        })


    }

}


class DisplayBoards extends React.Component {

    subsCribeNewBoards = (subscribeToMore) => {
        return subscribeToMore({
            document: gql(onCreateBoard),
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newBoardData = subscriptionData.data.onCreateBoard;
                return Object.assign({}, prev, {
                  listBoards: {
                        ...prev.listBoards,
                        items: [...prev.listBoards.items, newBoardData]
                    }
                })
            }
        })
    }


    render() {
        return (
            <div className="boards">
                <Query query={gql(listBoards)}  >
                    {({ loading, data, error, subscribeToMore }) => {

                        if (loading) return <p>loading...</p>
                        if (error) return <p>{error.message}</p>

                        return <Board data={data} subscribeToMore={() =>
                            this.subsCribeNewBoards(subscribeToMore)} />
                    }}
                </Query>



            </div>
        )
    }
}


export default DisplayBoards;