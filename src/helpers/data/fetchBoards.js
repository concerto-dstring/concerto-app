import React, { useState, setState } from "react";
import { Query } from 'react-apollo'
import gql from "graphql-tag";

import { listBoards, getBoard} from "../../graphql/queries";
import { onCreateBoard } from "../../graphql/subscriptions";

function GetBoardbyId(props) {
    const { client, boardid } = props;
    const [busy, setBusy] = useState(
        false
      );
    
    setState({ busy: true });

    const result = client.query({
        getBoard,
        fetchPolicy: 'network-only',
    });

    setState({ busy: false });

    return result ;
}

function ListAllBoards(props) {
    const { client } = props;
    const [busy, setBusy] = useState(
        false
      );
    
    setState({ busy: true });

    const result = client.query({
        listBoards,
        fetchPolicy: 'network-only',
    });

    setState({ busy: false });
    return result;
}

export default {ListAllBoards, GetBoardbyId};