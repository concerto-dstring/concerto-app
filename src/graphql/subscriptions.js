/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany {
    onCreateCompany {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany {
    onUpdateCompany {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany {
    onDeleteCompany {
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
export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam {
    onCreateTeam {
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
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam {
    onUpdateTeam {
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
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam {
    onDeleteTeam {
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
export const onCreateTeamUser = /* GraphQL */ `
  subscription OnCreateTeamUser {
    onCreateTeamUser {
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
export const onUpdateTeamUser = /* GraphQL */ `
  subscription OnUpdateTeamUser {
    onUpdateTeamUser {
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
export const onDeleteTeamUser = /* GraphQL */ `
  subscription OnDeleteTeamUser {
    onDeleteTeamUser {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateBoardSubscribedUser = /* GraphQL */ `
  subscription OnCreateBoardSubscribedUser {
    onCreateBoardSubscribedUser {
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
export const onUpdateBoardSubscribedUser = /* GraphQL */ `
  subscription OnUpdateBoardSubscribedUser {
    onUpdateBoardSubscribedUser {
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
export const onDeleteBoardSubscribedUser = /* GraphQL */ `
  subscription OnDeleteBoardSubscribedUser {
    onDeleteBoardSubscribedUser {
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
export const onCreateBoard = /* GraphQL */ `
  subscription OnCreateBoard {
    onCreateBoard {
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
export const onUpdateBoard = /* GraphQL */ `
  subscription OnUpdateBoard {
    onUpdateBoard {
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
export const onDeleteBoard = /* GraphQL */ `
  subscription OnDeleteBoard {
    onDeleteBoard {
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
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup {
    onCreateGroup {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup {
    onUpdateGroup {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup {
    onDeleteGroup {
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
export const onCreateRow = /* GraphQL */ `
  subscription OnCreateRow {
    onCreateRow {
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
export const onUpdateRow = /* GraphQL */ `
  subscription OnUpdateRow {
    onUpdateRow {
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
export const onDeleteRow = /* GraphQL */ `
  subscription OnDeleteRow {
    onDeleteRow {
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
export const onCreateColumnBoard = /* GraphQL */ `
  subscription OnCreateColumnBoard {
    onCreateColumnBoard {
      id
      boardId
      columnId
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
      fixed
      level
      collpse
      rank
    }
  }
`;
export const onUpdateColumnBoard = /* GraphQL */ `
  subscription OnUpdateColumnBoard {
    onUpdateColumnBoard {
      id
      boardId
      columnId
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
      fixed
      level
      collpse
      rank
    }
  }
`;
export const onDeleteColumnBoard = /* GraphQL */ `
  subscription OnDeleteColumnBoard {
    onDeleteColumnBoard {
      id
      boardId
      columnId
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
      fixed
      level
      collpse
      rank
    }
  }
`;
export const onCreateColumn = /* GraphQL */ `
  subscription OnCreateColumn {
    onCreateColumn {
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
export const onUpdateColumn = /* GraphQL */ `
  subscription OnUpdateColumn {
    onUpdateColumn {
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
export const onDeleteColumn = /* GraphQL */ `
  subscription OnDeleteColumn {
    onDeleteColumn {
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
export const onCreateData = /* GraphQL */ `
  subscription OnCreateData {
    onCreateData {
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
export const onUpdateData = /* GraphQL */ `
  subscription OnUpdateData {
    onUpdateData {
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
export const onDeleteData = /* GraphQL */ `
  subscription OnDeleteData {
    onDeleteData {
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
