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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createBoardSubscribedUser = /* GraphQL */ `
  mutation CreateBoardSubscribedUser(
    $input: CreateBoardSubscribedUserInput!
    $condition: ModelBoardSubscribedUserConditionInput
  ) {
    createBoardSubscribedUser(input: $input, condition: $condition) {
      id
      boardSubscribedID
      userID
      boardSubscribed {
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
    }
  }
`;
export const updateBoardSubscribedUser = /* GraphQL */ `
  mutation UpdateBoardSubscribedUser(
    $input: UpdateBoardSubscribedUserInput!
    $condition: ModelBoardSubscribedUserConditionInput
  ) {
    updateBoardSubscribedUser(input: $input, condition: $condition) {
      id
      boardSubscribedID
      userID
      boardSubscribed {
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
    }
  }
`;
export const deleteBoardSubscribedUser = /* GraphQL */ `
  mutation DeleteBoardSubscribedUser(
    $input: DeleteBoardSubscribedUserInput!
    $condition: ModelBoardSubscribedUserConditionInput
  ) {
    deleteBoardSubscribedUser(input: $input, condition: $condition) {
      id
      boardSubscribedID
      userID
      boardSubscribed {
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
export const createGroup = /* GraphQL */ `
  mutation CreateGroup(
    $input: CreateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    createGroup(input: $input, condition: $condition) {
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
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup(
    $input: UpdateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    updateGroup(input: $input, condition: $condition) {
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
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup(
    $input: DeleteGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    deleteGroup(input: $input, condition: $condition) {
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
export const createRow = /* GraphQL */ `
  mutation CreateRow(
    $input: CreateRowInput!
    $condition: ModelRowConditionInput
  ) {
    createRow(input: $input, condition: $condition) {
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
export const updateRow = /* GraphQL */ `
  mutation UpdateRow(
    $input: UpdateRowInput!
    $condition: ModelRowConditionInput
  ) {
    updateRow(input: $input, condition: $condition) {
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
export const deleteRow = /* GraphQL */ `
  mutation DeleteRow(
    $input: DeleteRowInput!
    $condition: ModelRowConditionInput
  ) {
    deleteRow(input: $input, condition: $condition) {
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
export const createColumnBoard = /* GraphQL */ `
  mutation CreateColumnBoard(
    $input: CreateColumnBoardInput!
    $condition: ModelColumnBoardConditionInput
  ) {
    createColumnBoard(input: $input, condition: $condition) {
      id
      boardID
      columnID
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
      column {
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
      fixed
      level
      collpse
      deleteFlag
      rank
    }
  }
`;
export const updateColumnBoard = /* GraphQL */ `
  mutation UpdateColumnBoard(
    $input: UpdateColumnBoardInput!
    $condition: ModelColumnBoardConditionInput
  ) {
    updateColumnBoard(input: $input, condition: $condition) {
      id
      boardID
      columnID
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
      column {
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
      fixed
      level
      collpse
      deleteFlag
      rank
    }
  }
`;
export const deleteColumnBoard = /* GraphQL */ `
  mutation DeleteColumnBoard(
    $input: DeleteColumnBoardInput!
    $condition: ModelColumnBoardConditionInput
  ) {
    deleteColumnBoard(input: $input, condition: $condition) {
      id
      boardID
      columnID
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
      column {
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
      fixed
      level
      collpse
      deleteFlag
      rank
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
export const updateColumn = /* GraphQL */ `
  mutation UpdateColumn(
    $input: UpdateColumnInput!
    $condition: ModelColumnConditionInput
  ) {
    updateColumn(input: $input, condition: $condition) {
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
export const deleteColumn = /* GraphQL */ `
  mutation DeleteColumn(
    $input: DeleteColumnInput!
    $condition: ModelColumnConditionInput
  ) {
    deleteColumn(input: $input, condition: $condition) {
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
export const createData = /* GraphQL */ `
  mutation CreateData(
    $input: CreateDataInput!
    $condition: ModelDataConditionInput
  ) {
    createData(input: $input, condition: $condition) {
      id
      columnID
      rowID
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
      columnID
      rowID
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
      columnID
      rowID
      value
    }
  }
`;
export const createThreadOnRow = /* GraphQL */ `
  mutation CreateThreadOnRow(
    $input: CreateThreadOnRowInput!
    $condition: ModelThreadOnRowConditionInput
  ) {
    createThreadOnRow(input: $input, condition: $condition) {
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
export const updateThreadOnRow = /* GraphQL */ `
  mutation UpdateThreadOnRow(
    $input: UpdateThreadOnRowInput!
    $condition: ModelThreadOnRowConditionInput
  ) {
    updateThreadOnRow(input: $input, condition: $condition) {
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
export const deleteThreadOnRow = /* GraphQL */ `
  mutation DeleteThreadOnRow(
    $input: DeleteThreadOnRowInput!
    $condition: ModelThreadOnRowConditionInput
  ) {
    deleteThreadOnRow(input: $input, condition: $condition) {
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
export const createReplyOnThread = /* GraphQL */ `
  mutation CreateReplyOnThread(
    $input: CreateReplyOnThreadInput!
    $condition: ModelReplyOnThreadConditionInput
  ) {
    createReplyOnThread(input: $input, condition: $condition) {
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
export const updateReplyOnThread = /* GraphQL */ `
  mutation UpdateReplyOnThread(
    $input: UpdateReplyOnThreadInput!
    $condition: ModelReplyOnThreadConditionInput
  ) {
    updateReplyOnThread(input: $input, condition: $condition) {
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
export const deleteReplyOnThread = /* GraphQL */ `
  mutation DeleteReplyOnThread(
    $input: DeleteReplyOnThreadInput!
    $condition: ModelReplyOnThreadConditionInput
  ) {
    deleteReplyOnThread(input: $input, condition: $condition) {
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
export const createInboxOnRow = /* GraphQL */ `
  mutation CreateInboxOnRow(
    $input: CreateInboxOnRowInput!
    $condition: ModelInboxOnRowConditionInput
  ) {
    createInboxOnRow(input: $input, condition: $condition) {
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
export const updateInboxOnRow = /* GraphQL */ `
  mutation UpdateInboxOnRow(
    $input: UpdateInboxOnRowInput!
    $condition: ModelInboxOnRowConditionInput
  ) {
    updateInboxOnRow(input: $input, condition: $condition) {
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
export const deleteInboxOnRow = /* GraphQL */ `
  mutation DeleteInboxOnRow(
    $input: DeleteInboxOnRowInput!
    $condition: ModelInboxOnRowConditionInput
  ) {
    deleteInboxOnRow(input: $input, condition: $condition) {
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
