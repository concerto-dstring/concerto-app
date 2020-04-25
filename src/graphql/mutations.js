/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
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
        createdAt
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
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
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
        createdAt
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
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
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
        createdAt
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
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
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
        createdAt
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
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
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
        createdAt
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
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
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
        createdAt
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
export const createTeamUser = /* GraphQL */ `
  mutation CreateTeamUser(
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
        createdAt
      }
    }
  }
`;
export const updateTeamUser = /* GraphQL */ `
  mutation UpdateTeamUser(
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
        createdAt
      }
    }
  }
`;
export const deleteTeamUser = /* GraphQL */ `
  mutation DeleteTeamUser(
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
        createdAt
      }
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
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
      createdAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
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
      createdAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
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
      createdAt
    }
  }
`;
export const createBoard = /* GraphQL */ `
  mutation CreateBoard(
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
      }
      createdAt
    }
  }
`;
export const updateBoard = /* GraphQL */ `
  mutation UpdateBoard(
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
      }
      createdAt
    }
  }
`;
export const deleteBoard = /* GraphQL */ `
  mutation DeleteBoard(
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
      }
      createdAt
    }
  }
`;
export const createGroup = /* GraphQL */ `
  mutation CreateGroup(
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
      }
      rank
      createdAt
    }
  }
`;
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup(
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
      }
      rank
      createdAt
    }
  }
`;
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup(
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
      }
      rank
      createdAt
    }
  }
`;
export const createRow = /* GraphQL */ `
  mutation CreateRow(
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
      }
      rank
      createdAt
    }
  }
`;
export const updateRow = /* GraphQL */ `
  mutation UpdateRow(
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
      }
      rank
      createdAt
    }
  }
`;
export const deleteRow = /* GraphQL */ `
  mutation DeleteRow(
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
      }
      rank
      createdAt
    }
  }
`;
export const createColumn = /* GraphQL */ `
  mutation CreateColumn(
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
        createdAt
      }
      createdAt
    }
  }
`;
export const updateColumn = /* GraphQL */ `
  mutation UpdateColumn(
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
        createdAt
      }
      createdAt
    }
  }
`;
export const deleteColumn = /* GraphQL */ `
  mutation DeleteColumn(
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
        createdAt
      }
      createdAt
    }
  }
`;
export const createData = /* GraphQL */ `
  mutation CreateData(
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
          createdAt
        }
        createdAt
      }
      value
    }
  }
`;
export const updateData = /* GraphQL */ `
  mutation UpdateData(
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
          createdAt
        }
        createdAt
      }
      value
    }
  }
`;
export const deleteData = /* GraphQL */ `
  mutation DeleteData(
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
          createdAt
        }
        createdAt
      }
      value
    }
  }
`;
