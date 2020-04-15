/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCompany = `mutation CreateCompany(
  $input: CreateCompanyInput!
  $condition: ModelCompanyConditionInput
) {
  createCompany(input: $input, condition: $condition) {
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
export const updateCompany = `mutation UpdateCompany(
  $input: UpdateCompanyInput!
  $condition: ModelCompanyConditionInput
) {
  updateCompany(input: $input, condition: $condition) {
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
export const deleteCompany = `mutation DeleteCompany(
  $input: DeleteCompanyInput!
  $condition: ModelCompanyConditionInput
) {
  deleteCompany(input: $input, condition: $condition) {
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
export const createTeam = `mutation CreateTeam(
  $input: CreateTeamInput!
  $condition: ModelTeamConditionInput
) {
  createTeam(input: $input, condition: $condition) {
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
export const updateTeam = `mutation UpdateTeam(
  $input: UpdateTeamInput!
  $condition: ModelTeamConditionInput
) {
  updateTeam(input: $input, condition: $condition) {
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
export const deleteTeam = `mutation DeleteTeam(
  $input: DeleteTeamInput!
  $condition: ModelTeamConditionInput
) {
  deleteTeam(input: $input, condition: $condition) {
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
export const createTeamUser = `mutation CreateTeamUser(
  $input: CreateTeamUserInput!
  $condition: ModelTeamUserConditionInput
) {
  createTeamUser(input: $input, condition: $condition) {
    id
    teamID
    userID
    team {
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
    user {
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
export const updateTeamUser = `mutation UpdateTeamUser(
  $input: UpdateTeamUserInput!
  $condition: ModelTeamUserConditionInput
) {
  updateTeamUser(input: $input, condition: $condition) {
    id
    teamID
    userID
    team {
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
    user {
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
export const deleteTeamUser = `mutation DeleteTeamUser(
  $input: DeleteTeamUserInput!
  $condition: ModelTeamUserConditionInput
) {
  deleteTeamUser(input: $input, condition: $condition) {
    id
    teamID
    userID
    team {
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
    user {
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
export const createUser = `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
export const updateUser = `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
export const deleteUser = `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
export const createBoard = `mutation CreateBoard(
  $input: CreateBoardInput!
  $condition: ModelBoardConditionInput
) {
  createBoard(input: $input, condition: $condition) {
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
export const updateBoard = `mutation UpdateBoard(
  $input: UpdateBoardInput!
  $condition: ModelBoardConditionInput
) {
  updateBoard(input: $input, condition: $condition) {
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
export const deleteBoard = `mutation DeleteBoard(
  $input: DeleteBoardInput!
  $condition: ModelBoardConditionInput
) {
  deleteBoard(input: $input, condition: $condition) {
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
export const createGroup = `mutation CreateGroup(
  $input: CreateGroupInput!
  $condition: ModelGroupConditionInput
) {
  createGroup(input: $input, condition: $condition) {
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
export const updateGroup = `mutation UpdateGroup(
  $input: UpdateGroupInput!
  $condition: ModelGroupConditionInput
) {
  updateGroup(input: $input, condition: $condition) {
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
export const deleteGroup = `mutation DeleteGroup(
  $input: DeleteGroupInput!
  $condition: ModelGroupConditionInput
) {
  deleteGroup(input: $input, condition: $condition) {
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
export const createRow = `mutation CreateRow(
  $input: CreateRowInput!
  $condition: ModelRowConditionInput
) {
  createRow(input: $input, condition: $condition) {
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
export const updateRow = `mutation UpdateRow(
  $input: UpdateRowInput!
  $condition: ModelRowConditionInput
) {
  updateRow(input: $input, condition: $condition) {
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
export const deleteRow = `mutation DeleteRow(
  $input: DeleteRowInput!
  $condition: ModelRowConditionInput
) {
  deleteRow(input: $input, condition: $condition) {
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
export const createColumn = `mutation CreateColumn(
  $input: CreateColumnInput!
  $condition: ModelColumnConditionInput
) {
  createColumn(input: $input, condition: $condition) {
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
export const updateColumn = `mutation UpdateColumn(
  $input: UpdateColumnInput!
  $condition: ModelColumnConditionInput
) {
  updateColumn(input: $input, condition: $condition) {
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
export const deleteColumn = `mutation DeleteColumn(
  $input: DeleteColumnInput!
  $condition: ModelColumnConditionInput
) {
  deleteColumn(input: $input, condition: $condition) {
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
export const createData = `mutation CreateData(
  $input: CreateDataInput!
  $condition: ModelDataConditionInput
) {
  createData(input: $input, condition: $condition) {
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
export const updateData = `mutation UpdateData(
  $input: UpdateDataInput!
  $condition: ModelDataConditionInput
) {
  updateData(input: $input, condition: $condition) {
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
export const deleteData = `mutation DeleteData(
  $input: DeleteDataInput!
  $condition: ModelDataConditionInput
) {
  deleteData(input: $input, condition: $condition) {
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