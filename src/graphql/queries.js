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
        email
        fname
        lname
        usertype
        title
        phone
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
          companyId
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
          email
          fname
          lname
          usertype
          title
          phone
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
        email
        fname
        lname
        usertype
        title
        phone
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
      companyId
      company {
        id
        name
        email
        phone
        admin {
          id
          email
          fname
          lname
          usertype
          title
          phone
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
          email
          fname
          lname
          usertype
          title
          phone
          createdAt
        }
        companyId
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
      email
      fname
      lname
      usertype
      title
      phone
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
          creatorId
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
          boardId
          creatorId
          rank
          createdAt
        }
        nextToken
      }
      columnCreated {
        items {
          id
          name
          columntype
          columnComponentType
          creatorId
          createdAt
        }
        nextToken
      }
      rowCreated {
        items {
          id
          groupId
          createorId
          rank
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
        email
        fname
        lname
        usertype
        title
        phone
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
          boardId
          creatorId
          rank
          createdAt
        }
        nextToken
      }
      columns {
        items {
          id
          boardId
          columnId
          fixed
          level
          collpse
          rank
        }
        nextToken
      }
      creatorId
      creator {
        id
        email
        fname
        lname
        usertype
        title
        phone
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
        creatorId
        creator {
          id
          email
          fname
          lname
          usertype
          title
          phone
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
      boardId
      board {
        id
        name
        groups {
          nextToken
        }
        columns {
          nextToken
        }
        creatorId
        creator {
          id
          email
          fname
          lname
          usertype
          title
          phone
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
          groupId
          createorId
          rank
          createdAt
        }
        nextToken
      }
      creatorId
      creator {
        id
        email
        fname
        lname
        usertype
        title
        phone
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
        boardId
        board {
          id
          name
          creatorId
          createdAt
        }
        rows {
          nextToken
        }
        creatorId
        creator {
          id
          email
          fname
          lname
          usertype
          title
          phone
          createdAt
        }
        rank
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
      groupId
      group {
        id
        name
        boardId
        board {
          id
          name
          creatorId
          createdAt
        }
        rows {
          nextToken
        }
        creatorId
        creator {
          id
          email
          fname
          lname
          usertype
          title
          phone
          createdAt
        }
        rank
        createdAt
      }
      datas {
        items {
          id
          columnId
          rowId
          value
        }
        nextToken
      }
      createorId
      creator {
        id
        email
        fname
        lname
        usertype
        title
        phone
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
        groupId
        group {
          id
          name
          boardId
          creatorId
          rank
          createdAt
        }
        datas {
          nextToken
        }
        createorId
        creator {
          id
          email
          fname
          lname
          usertype
          title
          phone
          createdAt
        }
        rank
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
          boardId
          columnId
          fixed
          level
          collpse
          rank
        }
        nextToken
      }
      name
      columntype
      columnComponentType
      creatorId
      creator {
        id
        email
        fname
        lname
        usertype
        title
        phone
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
      datas {
        items {
          id
          columnId
          rowId
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
        name
        columntype
        columnComponentType
        creatorId
        creator {
          id
          email
          fname
          lname
          usertype
          title
          phone
          createdAt
        }
        createdAt
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
      columnId
      column {
        id
        board {
          nextToken
        }
        name
        columntype
        columnComponentType
        creatorId
        creator {
          id
          email
          fname
          lname
          usertype
          title
          phone
          createdAt
        }
        createdAt
        datas {
          nextToken
        }
      }
      rowId
      row {
        id
        groupId
        group {
          id
          name
          boardId
          creatorId
          rank
          createdAt
        }
        datas {
          nextToken
        }
        createorId
        creator {
          id
          email
          fname
          lname
          usertype
          title
          phone
          createdAt
        }
        rank
        createdAt
      }
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
        columnId
        column {
          id
          name
          columntype
          columnComponentType
          creatorId
          createdAt
        }
        rowId
        row {
          id
          groupId
          createorId
          rank
          createdAt
        }
        value
      }
      nextToken
    }
  }
`;
