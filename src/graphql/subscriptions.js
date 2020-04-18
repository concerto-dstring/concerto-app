/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCompany = `subscription OnCreateCompany {
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
export const onUpdateCompany = `subscription OnUpdateCompany {
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
export const onDeleteCompany = `subscription OnDeleteCompany {
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
export const onCreateTeam = `subscription OnCreateTeam {
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
export const onUpdateTeam = `subscription OnUpdateTeam {
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
export const onDeleteTeam = `subscription OnDeleteTeam {
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
export const onCreateTeamUser = `subscription OnCreateTeamUser {
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
export const onUpdateTeamUser = `subscription OnUpdateTeamUser {
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
export const onDeleteTeamUser = `subscription OnDeleteTeamUser {
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
export const onCreateUser = `subscription OnCreateUser {
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
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
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
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
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
  }
}
`;
export const onCreateBoard = `subscription OnCreateBoard {
  onCreateBoard {
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
export const onUpdateBoard = `subscription OnUpdateBoard {
  onUpdateBoard {
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
export const onDeleteBoard = `subscription OnDeleteBoard {
  onDeleteBoard {
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
export const onCreateGroup = `subscription OnCreateGroup {
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
export const onUpdateGroup = `subscription OnUpdateGroup {
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
export const onDeleteGroup = `subscription OnDeleteGroup {
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
export const onCreateRow = `subscription OnCreateRow {
  onCreateRow {
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
export const onUpdateRow = `subscription OnUpdateRow {
  onUpdateRow {
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
export const onDeleteRow = `subscription OnDeleteRow {
  onDeleteRow {
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
export const onCreateColumn = `subscription OnCreateColumn {
  onCreateColumn {
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
export const onUpdateColumn = `subscription OnUpdateColumn {
  onUpdateColumn {
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
export const onDeleteColumn = `subscription OnDeleteColumn {
  onDeleteColumn {
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
export const onCreateData = `subscription OnCreateData {
  onCreateData {
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
export const onUpdateData = `subscription OnUpdateData {
  onUpdateData {
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
export const onDeleteData = `subscription OnDeleteData {
  onDeleteData {
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
