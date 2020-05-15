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
      companyID
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
          boardID
          creatorID
          rank
          deleteFlag
          isCollapsed
          color
          createdAt
          rows {
            items {
              id
              parentId
              groupID
              creatorID
              rank
              deleteFlag
              createdAt
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
            nextToken
          }
        }
        nextToken
      }
      columns {
        items {
          id
          boardID
          columnID
          column {
            id
            name
            deleteFlag
            columntype
            columnComponentType
            creatorID
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
        creatorID
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
          email
          fname
          lname
          usertype
          title
          phone
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
          email
          fname
          lname
          usertype
          title
          phone
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
          email
          fname
          lname
          usertype
          title
          phone
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
      name
      columntype
      columnComponentType
      creatorID
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
        name
        columntype
        columnComponentType
        creatorID
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
      column {
        id
        board {
          nextToken
        }
        name
        columntype
        columnComponentType
        creatorID
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
        deleteFlag
        datas {
          nextToken
        }
      }
      rowID
      row {
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
          email
          fname
          lname
          usertype
          title
          phone
          createdAt
        }
        rank
        parentId
        deleteFlag
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
        columnID
        column {
          id
          name
          columntype
          columnComponentType
          creatorID
          createdAt
          deleteFlag
        }
        rowID
        row {
          id
          groupID
          creatorID
          rank
          parentId
          deleteFlag
          createdAt
        }
        value
      }
      nextToken
    }
  }
`;
