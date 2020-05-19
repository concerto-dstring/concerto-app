/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      email
      phone
      admin {
        id
        username
        email
        fname
        lname
        usertype
        title
        phone
        avatar
        teams {
          nextToken
        }
        createdAt
        boardCreated {
          nextToken
        }
        boardSubscribed {
          nextToken
        }
        groupCreated {
          nextToken
        }
        columnCreated {
          nextToken
        }
        rowCreated {
          nextToken
        }
      }
      teams {
        items {
          id
          name
          companyID
          upteam
          downteams
          createdAt
        }
        nextToken
      }
      createdAt
    }
  }
`;
export const listCompanys = /* GraphQL */ `
  query ListCompanys(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        phone
        admin {
          id
          username
          email
          fname
          lname
          usertype
          title
          phone
          avatar
          createdAt
        }
        teams {
          nextToken
        }
        createdAt
      }
      nextToken
    }
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      name
      admin {
        id
        username
        email
        fname
        lname
        usertype
        title
        phone
        avatar
        teams {
          nextToken
        }
        createdAt
        boardCreated {
          nextToken
        }
        boardSubscribed {
          nextToken
        }
        groupCreated {
          nextToken
        }
        columnCreated {
          nextToken
        }
        rowCreated {
          nextToken
        }
      }
      companyID
      company {
        id
        name
        email
        phone
        admin {
          id
          username
          email
          fname
          lname
          usertype
          title
          phone
          avatar
          createdAt
        }
        teams {
          nextToken
        }
        createdAt
      }
      users {
        items {
          id
          teamID
          userID
        }
        nextToken
      }
      upteam
      downteams
      createdAt
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        admin {
          id
          username
          email
          fname
          lname
          usertype
          title
          phone
          avatar
          createdAt
        }
        companyID
        company {
          id
          name
          email
          phone
          createdAt
        }
        users {
          nextToken
        }
        upteam
        downteams
        createdAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      fname
      lname
      usertype
      title
      phone
      avatar
      teams {
        items {
          id
          teamID
          userID
        }
        nextToken
      }
      createdAt
      boardCreated {
        items {
          id
          name
          creatorID
          createdAt
        }
        nextToken
      }
      boardSubscribed {
        items {
          id
          boardSubscribedID
          userID
        }
        nextToken
      }
      groupCreated {
        items {
          id
          name
          boardID
          creatorID
          rank
          deleteFlag
          isCollapsed
          color
          createdAt
        }
        nextToken
      }
      columnCreated {
        items {
          id
          isTitle
          name
          columntype
          columnComponentType
          creatorID
          createdAt
          deleteFlag
        }
        nextToken
      }
      rowCreated {
        items {
          id
          groupID
          creatorID
          rank
          parentId
          deleteFlag
          createdAt
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        fname
        lname
        usertype
        title
        phone
        avatar
        teams {
          nextToken
        }
        createdAt
        boardCreated {
          nextToken
        }
        boardSubscribed {
          nextToken
        }
        groupCreated {
          nextToken
        }
        columnCreated {
          nextToken
        }
        rowCreated {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getBoard = /* GraphQL */ `
  query GetBoard($id: ID!) {
    getBoard(id: $id) {
      id
      name
      groups {
        items {
          id
          name
          boardID
          creatorID
          rank
          deleteFlag
          isCollapsed
          color
          createdAt
        }
        nextToken
      }
      columns {
        items {
          id
          boardID
          columnID
          fixed
          level
          collpse
          deleteFlag
          rank
        }
        nextToken
      }
      creatorID
      creator {
        id
        username
        email
        fname
        lname
        usertype
        title
        phone
        avatar
        teams {
          nextToken
        }
        createdAt
        boardCreated {
          nextToken
        }
        boardSubscribed {
          nextToken
        }
        groupCreated {
          nextToken
        }
        columnCreated {
          nextToken
        }
        rowCreated {
          nextToken
        }
      }
      subscribers {
        items {
          id
          boardSubscribedID
          userID
        }
        nextToken
      }
      createdAt
    }
  }
`;
export const listBoards = /* GraphQL */ `
  query ListBoards(
    $filter: ModelBoardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBoards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        groups {
          nextToken
        }
        columns {
          nextToken
        }
        creatorID
        creator {
          id
          username
          email
          fname
          lname
          usertype
          title
          phone
          avatar
          createdAt
        }
        subscribers {
          nextToken
        }
        createdAt
      }
      nextToken
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      name
      boardID
      board {
        id
        name
        groups {
          nextToken
        }
        columns {
          nextToken
        }
        creatorID
        creator {
          id
          username
          email
          fname
          lname
          usertype
          title
          phone
          avatar
          createdAt
        }
        subscribers {
          nextToken
        }
        createdAt
      }
      rows {
        items {
          id
          groupID
          creatorID
          rank
          parentId
          deleteFlag
          createdAt
        }
        nextToken
      }
      creatorID
      creator {
        id
        username
        email
        fname
        lname
        usertype
        title
        phone
        avatar
        teams {
          nextToken
        }
        createdAt
        boardCreated {
          nextToken
        }
        boardSubscribed {
          nextToken
        }
        groupCreated {
          nextToken
        }
        columnCreated {
          nextToken
        }
        rowCreated {
          nextToken
        }
      }
      rank
      deleteFlag
      isCollapsed
      color
      createdAt
    }
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        boardID
        board {
          id
          name
          creatorID
          createdAt
        }
        rows {
          nextToken
        }
        creatorID
        creator {
          id
          username
          email
          fname
          lname
          usertype
          title
          phone
          avatar
          createdAt
        }
        rank
        deleteFlag
        isCollapsed
        color
        createdAt
      }
      nextToken
    }
  }
`;
export const getRow = /* GraphQL */ `
  query GetRow($id: ID!) {
    getRow(id: $id) {
      id
      groupID
      group {
        id
        name
        boardID
        board {
          id
          name
          creatorID
          createdAt
        }
        rows {
          nextToken
        }
        creatorID
        creator {
          id
          username
          email
          fname
          lname
          usertype
          title
          phone
          avatar
          createdAt
        }
        rank
        deleteFlag
        isCollapsed
        color
        createdAt
      }
      datas {
        items {
          id
          columnID
          rowID
          value
        }
        nextToken
      }
      creatorID
      creator {
        id
        username
        email
        fname
        lname
        usertype
        title
        phone
        avatar
        teams {
          nextToken
        }
        createdAt
        boardCreated {
          nextToken
        }
        boardSubscribed {
          nextToken
        }
        groupCreated {
          nextToken
        }
        columnCreated {
          nextToken
        }
        rowCreated {
          nextToken
        }
      }
      rank
      parentId
      deleteFlag
      createdAt
    }
  }
`;
export const listRows = /* GraphQL */ `
  query ListRows(
    $filter: ModelRowFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRows(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        groupID
        group {
          id
          name
          boardID
          creatorID
          rank
          deleteFlag
          isCollapsed
          color
          createdAt
        }
        datas {
          nextToken
        }
        creatorID
        creator {
          id
          username
          email
          fname
          lname
          usertype
          title
          phone
          avatar
          createdAt
        }
        rank
        parentId
        deleteFlag
        createdAt
      }
      nextToken
    }
  }
`;
export const getColumn = /* GraphQL */ `
  query GetColumn($id: ID!) {
    getColumn(id: $id) {
      id
      board {
        items {
          id
          boardID
          columnID
          fixed
          level
          collpse
          deleteFlag
          rank
        }
        nextToken
      }
      isTitle
      name
      columntype
      columnComponentType
      creatorID
      creator {
        id
        username
        email
        fname
        lname
        usertype
        title
        phone
        avatar
        teams {
          nextToken
        }
        createdAt
        boardCreated {
          nextToken
        }
        boardSubscribed {
          nextToken
        }
        groupCreated {
          nextToken
        }
        columnCreated {
          nextToken
        }
        rowCreated {
          nextToken
        }
      }
      createdAt
      deleteFlag
      datas {
        items {
          id
          columnID
          rowID
          value
        }
        nextToken
      }
    }
  }
`;
export const listColumns = /* GraphQL */ `
  query ListColumns(
    $filter: ModelColumnFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listColumns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        board {
          nextToken
        }
        isTitle
        name
        columntype
        columnComponentType
        creatorID
        creator {
          id
          username
          email
          fname
          lname
          usertype
          title
          phone
          avatar
          createdAt
        }
        createdAt
        deleteFlag
        datas {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getData = /* GraphQL */ `
  query GetData($id: ID!) {
    getData(id: $id) {
      id
      columnID
      rowID
      value
    }
  }
`;
export const listDatas = /* GraphQL */ `
  query ListDatas(
    $filter: ModelDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        columnID
        rowID
        value
      }
      nextToken
    }
  }
`;
export const getThreadOnRow = /* GraphQL */ `
  query GetThreadOnRow($id: ID!) {
    getThreadOnRow(id: $id) {
      id
      rowID
      userID
      user {
        id
        username
        email
        fname
        lname
        usertype
        title
        phone
        avatar
        teams {
          nextToken
        }
        createdAt
        boardCreated {
          nextToken
        }
        boardSubscribed {
          nextToken
        }
        groupCreated {
          nextToken
        }
        columnCreated {
          nextToken
        }
        rowCreated {
          nextToken
        }
      }
      content
      createdAt
      likedByUsersID
      seenByUsersID
      repliesByDate {
        items {
          id
          threadID
          userID
          content
          createdAt
          likedByUsersID
          seenByUsersID
        }
        nextToken
      }
    }
  }
`;
export const listThreadOnRows = /* GraphQL */ `
  query ListThreadOnRows(
    $filter: ModelThreadOnRowFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listThreadOnRows(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        rowID
        userID
        user {
          id
          username
          email
          fname
          lname
          usertype
          title
          phone
          avatar
          createdAt
        }
        content
        createdAt
        likedByUsersID
        seenByUsersID
        repliesByDate {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getReplyOnThread = /* GraphQL */ `
  query GetReplyOnThread($id: ID!) {
    getReplyOnThread(id: $id) {
      id
      threadID
      userID
      user {
        id
        username
        email
        fname
        lname
        usertype
        title
        phone
        avatar
        teams {
          nextToken
        }
        createdAt
        boardCreated {
          nextToken
        }
        boardSubscribed {
          nextToken
        }
        groupCreated {
          nextToken
        }
        columnCreated {
          nextToken
        }
        rowCreated {
          nextToken
        }
      }
      content
      createdAt
      likedByUsersID
      seenByUsersID
    }
  }
`;
export const listReplyOnThreads = /* GraphQL */ `
  query ListReplyOnThreads(
    $filter: ModelReplyOnThreadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReplyOnThreads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        threadID
        userID
        user {
          id
          username
          email
          fname
          lname
          usertype
          title
          phone
          avatar
          createdAt
        }
        content
        createdAt
        likedByUsersID
        seenByUsersID
      }
      nextToken
    }
  }
`;
export const getInboxOnRow = /* GraphQL */ `
  query GetInboxOnRow($id: ID!, $createdAt: String!) {
    getInboxOnRow(id: $id, createdAt: $createdAt) {
      id
      rowID
      userID
      user {
        id
        username
        email
        fname
        lname
        usertype
        title
        phone
        avatar
        teams {
          nextToken
        }
        createdAt
        boardCreated {
          nextToken
        }
        boardSubscribed {
          nextToken
        }
        groupCreated {
          nextToken
        }
        columnCreated {
          nextToken
        }
        rowCreated {
          nextToken
        }
      }
      filelocations
      createdAt
    }
  }
`;
export const listInboxOnRows = /* GraphQL */ `
  query ListInboxOnRows(
    $id: ID
    $createdAt: ModelStringKeyConditionInput
    $filter: ModelInboxOnRowFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listInboxOnRows(
      id: $id
      createdAt: $createdAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        rowID
        userID
        user {
          id
          username
          email
          fname
          lname
          usertype
          title
          phone
          avatar
          createdAt
        }
        filelocations
        createdAt
      }
      nextToken
    }
  }
`;
