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
          id
          name
          createdAt
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
          id
          name
          createdAt
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
          createdAt
        }
        nextToken
      }
      boardSubscribed {
        id
        name
        groups {
          nextToken
        }
        columns {
          id
          name
          columntype
          createdAt
        }
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
      }
      groupCreated {
        items {
          id
          name
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
          createdAt
        }
        nextToken
      }
      rowCreated {
        items {
          id
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
          id
          name
          createdAt
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
          rank
          createdAt
        }
        nextToken
      }
      columns {
        id
        name
        columntype
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
      }
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
          id
          name
          createdAt
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
          id
          name
          createdAt
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
          id
          name
          columntype
          createdAt
        }
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
      board {
        id
        name
        groups {
          nextToken
        }
        columns {
          id
          name
          columntype
          createdAt
        }
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
      }
      rows {
        items {
          id
          rank
          createdAt
        }
        nextToken
      }
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
          id
          name
          createdAt
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
        board {
          id
          name
          createdAt
        }
        rows {
          nextToken
        }
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
      group {
        id
        name
        board {
          id
          name
          createdAt
        }
        rows {
          nextToken
        }
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
      data {
        id
        column {
          id
          name
          columntype
          createdAt
        }
        value
      }
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
          id
          name
          createdAt
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
        group {
          id
          name
          rank
          createdAt
        }
        data {
          id
          value
        }
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
      name
      columntype
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
          id
          name
          createdAt
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
        name
        columntype
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
      }
      nextToken
    }
  }
`;
export const getData = /* GraphQL */ `
  query GetData($id: ID!) {
    getData(id: $id) {
      id
      column {
        id
        name
        columntype
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
        column {
          id
          name
          columntype
          createdAt
        }
        value
      }
      nextToken
    }
  }
`;
