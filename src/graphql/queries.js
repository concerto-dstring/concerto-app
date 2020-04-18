/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCompany = `query GetCompany($id: ID!) {
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
    }
    teams {
      items {
        id
        name
        upteam
        downteams
      }
      nextToken
    }
  }
}
`;
export const listCompanys = `query ListCompanys(
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
      }
      teams {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getTeam = `query GetTeam($id: ID!) {
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
      }
      teams {
        nextToken
      }
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
  }
}
`;
export const listTeams = `query ListTeams(
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
      }
      company {
        id
        name
        email
        phone
      }
      users {
        nextToken
      }
      upteam
      downteams
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
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
  }
}
`;
export const listUsers = `query ListUsers(
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
    }
    nextToken
  }
}
`;
export const getBoard = `query GetBoard($id: ID!) {
  getBoard(id: $id) {
    id
    name
    groups {
      items {
        id
        name
        rank
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
      }
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
    }
  }
}
`;
export const listBoards = `query ListBoards(
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
      }
      creator {
        id
        email
        fname
        lname
        usertype
        title
        phone
      }
      subscribers {
        id
        email
        fname
        lname
        usertype
        title
        phone
      }
    }
    nextToken
  }
}
`;
export const getGroup = `query GetGroup($id: ID!) {
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
      }
      creator {
        id
        email
        fname
        lname
        usertype
        title
        phone
      }
      subscribers {
        id
        email
        fname
        lname
        usertype
        title
        phone
      }
    }
    rows {
      items {
        id
        rank
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
    }
    rank
  }
}
`;
export const listGroups = `query ListGroups(
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
      }
      rank
    }
    nextToken
  }
}
`;
export const getRow = `query GetRow($id: ID!) {
  getRow(id: $id) {
    id
    group {
      id
      name
      board {
        id
        name
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
      }
      rank
    }
    data {
      id
      column {
        id
        name
        columntype
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
    }
    rank
  }
}
`;
export const listRows = `query ListRows($filter: ModelRowFilterInput, $limit: Int, $nextToken: String) {
  listRows(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      group {
        id
        name
        rank
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
      }
      rank
    }
    nextToken
  }
}
`;
export const getColumn = `query GetColumn($id: ID!) {
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
    }
  }
}
`;
export const listColumns = `query ListColumns(
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
      }
    }
    nextToken
  }
}
`;
export const getData = `query GetData($id: ID!) {
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
      }
    }
    value
  }
}
`;
export const listDatas = `query ListDatas(
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
      }
      value
    }
    nextToken
  }
}
`;
