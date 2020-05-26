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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany {
    onUpdateCompany {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany {
    onDeleteCompany {
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
export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam {
    onCreateTeam {
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
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam {
    onUpdateTeam {
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
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam {
    onDeleteTeam {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateBoard = /* GraphQL */ `
  subscription OnCreateBoard {
    onCreateBoard {
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
export const onUpdateBoard = /* GraphQL */ `
  subscription OnUpdateBoard {
    onUpdateBoard {
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
export const onDeleteBoard = /* GraphQL */ `
  subscription OnDeleteBoard {
    onDeleteBoard {
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
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup {
    onCreateGroup {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup {
    onUpdateGroup {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup {
    onDeleteGroup {
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
export const onCreateRow = /* GraphQL */ `
  subscription OnCreateRow {
    onCreateRow {
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
      threadOnRow {
        items {
          id
          rowID
          userID
          content
          createdAt
          likedByUsersID
          seenByUsersID
        }
        nextToken
      }
      rank
      parentId
      deleteFlag
      createdAt
    }
  }
`;
export const onUpdateRow = /* GraphQL */ `
  subscription OnUpdateRow {
    onUpdateRow {
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
      threadOnRow {
        items {
          id
          rowID
          userID
          content
          createdAt
          likedByUsersID
          seenByUsersID
        }
        nextToken
      }
      rank
      parentId
      deleteFlag
      createdAt
    }
  }
`;
export const onDeleteRow = /* GraphQL */ `
  subscription OnDeleteRow {
    onDeleteRow {
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
      threadOnRow {
        items {
          id
          rowID
          userID
          content
          createdAt
          likedByUsersID
          seenByUsersID
        }
        nextToken
      }
      rank
      parentId
      deleteFlag
      createdAt
    }
  }
`;
export const onCreateColumnBoard = /* GraphQL */ `
  subscription OnCreateColumnBoard {
    onCreateColumnBoard {
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
export const onUpdateColumnBoard = /* GraphQL */ `
  subscription OnUpdateColumnBoard {
    onUpdateColumnBoard {
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
export const onDeleteColumnBoard = /* GraphQL */ `
  subscription OnDeleteColumnBoard {
    onDeleteColumnBoard {
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
export const onCreateColumn = /* GraphQL */ `
  subscription OnCreateColumn {
    onCreateColumn {
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
export const onUpdateColumn = /* GraphQL */ `
  subscription OnUpdateColumn {
    onUpdateColumn {
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
export const onDeleteColumn = /* GraphQL */ `
  subscription OnDeleteColumn {
    onDeleteColumn {
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
export const onCreateData = /* GraphQL */ `
  subscription OnCreateData {
    onCreateData {
      id
      columnID
      rowID
      value
    }
  }
`;
export const onUpdateData = /* GraphQL */ `
  subscription OnUpdateData {
    onUpdateData {
      id
      columnID
      rowID
      value
    }
  }
`;
export const onDeleteData = /* GraphQL */ `
  subscription OnDeleteData {
    onDeleteData {
      id
      columnID
      rowID
      value
    }
  }
`;
export const onCreateThreadOnRow = /* GraphQL */ `
  subscription OnCreateThreadOnRow {
    onCreateThreadOnRow {
      id
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
        threadOnRow {
          nextToken
        }
        rank
        parentId
        deleteFlag
        createdAt
      }
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
export const onUpdateThreadOnRow = /* GraphQL */ `
  subscription OnUpdateThreadOnRow {
    onUpdateThreadOnRow {
      id
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
        threadOnRow {
          nextToken
        }
        rank
        parentId
        deleteFlag
        createdAt
      }
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
export const onDeleteThreadOnRow = /* GraphQL */ `
  subscription OnDeleteThreadOnRow {
    onDeleteThreadOnRow {
      id
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
        threadOnRow {
          nextToken
        }
        rank
        parentId
        deleteFlag
        createdAt
      }
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
export const onCreateReplyOnThread = /* GraphQL */ `
  subscription OnCreateReplyOnThread {
    onCreateReplyOnThread {
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
export const onUpdateReplyOnThread = /* GraphQL */ `
  subscription OnUpdateReplyOnThread {
    onUpdateReplyOnThread {
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
export const onDeleteReplyOnThread = /* GraphQL */ `
  subscription OnDeleteReplyOnThread {
    onDeleteReplyOnThread {
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
export const onCreateInboxOnRow = /* GraphQL */ `
  subscription OnCreateInboxOnRow {
    onCreateInboxOnRow {
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
export const onUpdateInboxOnRow = /* GraphQL */ `
  subscription OnUpdateInboxOnRow {
    onUpdateInboxOnRow {
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
export const onDeleteInboxOnRow = /* GraphQL */ `
  subscription OnDeleteInboxOnRow {
    onDeleteInboxOnRow {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
      id
      subject
      content
      senderID
      sender {
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
      receiverID
      receiver {
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
      seenflag
      createdAt
    }
  }
`;
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
      id
      subject
      content
      senderID
      sender {
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
      receiverID
      receiver {
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
      seenflag
      createdAt
    }
  }
`;
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
      id
      subject
      content
      senderID
      sender {
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
      receiverID
      receiver {
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
      seenflag
      createdAt
    }
  }
`;
