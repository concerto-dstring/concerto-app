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
          color
          isCollapsed
          deleteFlag
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
          fixed
          level
          collpse
          rank
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
          color
          isCollapsed
          deleteFlag
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
          fixed
          level
          collpse
          rank
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
          color
          isCollapsed
          deleteFlag
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
          fixed
          level
          collpse
          rank
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
export const onCreateBoard = /* GraphQL */ `
  subscription OnCreateBoard {
    onCreateBoard {
      id
      name
      groups {
        items {
          id
          name
          rank
          color
          isCollapsed
          deleteFlag
          createdAt
        }
        nextToken
      }
      columns {
        items {
          id
          name
          columntype
          columnComponentType
          fixed
          level
          collpse
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
export const onUpdateBoard = /* GraphQL */ `
  subscription OnUpdateBoard {
    onUpdateBoard {
      id
      name
      groups {
        items {
          id
          name
          rank
          color
          isCollapsed
          deleteFlag
          createdAt
        }
        nextToken
      }
      columns {
        items {
          id
          name
          columntype
          columnComponentType
          fixed
          level
          collpse
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
export const onDeleteBoard = /* GraphQL */ `
  subscription OnDeleteBoard {
    onDeleteBoard {
      id
      name
      groups {
        items {
          id
          name
          rank
          color
          isCollapsed
          deleteFlag
          createdAt
        }
        nextToken
      }
      columns {
        items {
          id
          name
          columntype
          columnComponentType
          fixed
          level
          collpse
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
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup {
    onCreateGroup {
      id
      name
      board {
        id
        name
        groups {
          nextToken
        }
        columns {
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
      color
      isCollapsed
      deleteFlag
      createdAt
    }
  }
`;
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup {
    onUpdateGroup {
      id
      name
      board {
        id
        name
        groups {
          nextToken
        }
        columns {
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
      color
      isCollapsed
      deleteFlag
      createdAt
    }
  }
`;
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup {
    onDeleteGroup {
      id
      name
      board {
        id
        name
        groups {
          nextToken
        }
        columns {
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
      color
      isCollapsed
      deleteFlag
      createdAt
    }
  }
`;
export const onCreateRow = /* GraphQL */ `
  subscription OnCreateRow {
    onCreateRow {
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
        color
        isCollapsed
        deleteFlag
        createdAt
      }
      data {
        items {
          id
          value
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
export const onUpdateRow = /* GraphQL */ `
  subscription OnUpdateRow {
    onUpdateRow {
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
        color
        isCollapsed
        deleteFlag
        createdAt
      }
      data {
        items {
          id
          value
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
export const onDeleteRow = /* GraphQL */ `
  subscription OnDeleteRow {
    onDeleteRow {
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
        color
        isCollapsed
        deleteFlag
        createdAt
      }
      data {
        items {
          id
          value
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
export const onCreateColumn = /* GraphQL */ `
  subscription OnCreateColumn {
    onCreateColumn {
      id
      board {
        id
        name
        groups {
          nextToken
        }
        columns {
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
      name
      columntype
      columnComponentType
      fixed
      level
      collpse
      rank
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
      rowColumn {
        items {
          id
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
        id
        name
        groups {
          nextToken
        }
        columns {
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
      name
      columntype
      columnComponentType
      fixed
      level
      collpse
      rank
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
      rowColumn {
        items {
          id
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
        id
        name
        groups {
          nextToken
        }
        columns {
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
      name
      columntype
      columnComponentType
      fixed
      level
      collpse
      rank
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
      rowColumn {
        items {
          id
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
      column {
        id
        board {
          id
          name
          createdAt
        }
        name
        columntype
        columnComponentType
        fixed
        level
        collpse
        rank
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
        rowColumn {
          nextToken
        }
      }
      value
      row {
        id
        group {
          id
          name
          rank
          color
          isCollapsed
          deleteFlag
          createdAt
        }
        data {
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
    }
  }
`;
export const onUpdateData = /* GraphQL */ `
  subscription OnUpdateData {
    onUpdateData {
      id
      column {
        id
        board {
          id
          name
          createdAt
        }
        name
        columntype
        columnComponentType
        fixed
        level
        collpse
        rank
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
        rowColumn {
          nextToken
        }
      }
      value
      row {
        id
        group {
          id
          name
          rank
          color
          isCollapsed
          deleteFlag
          createdAt
        }
        data {
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
    }
  }
`;
export const onDeleteData = /* GraphQL */ `
  subscription OnDeleteData {
    onDeleteData {
      id
      column {
        id
        board {
          id
          name
          createdAt
        }
        name
        columntype
        columnComponentType
        fixed
        level
        collpse
        rank
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
        rowColumn {
          nextToken
        }
      }
      value
      row {
        id
        group {
          id
          name
          rank
          color
          isCollapsed
          deleteFlag
          createdAt
        }
        data {
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
    }
  }
`;
