const users = [{
  smallName:'Z',
  userName:'ZhangTao',
  faceColor:'#f4617f'
},{
  smallName:'C',
  userName:'Lucy Chen',
  faceColor:'#66cdff'
},{
  smallName:'L',
  userName:'Leo',
  faceColor:'#f49642'
},{
  smallName:'M',
  userName:'Jack Ma',
  faceColor:'#79cdcd'
},{
  smallName:'W',
  userName:'Civen Wang',
  faceColor:'#f4617f'
}]

export const getPeople = (userName) => {
  
  if (userName) {
    let userNameLow = userName.toLowerCase()
    let usersCopy = users.slice()

    let filterUsers = usersCopy.filter(user => {
      if (user.userName && user.userName.toLowerCase().indexOf(userNameLow) !== -1) {
        return user
      }
    })

    return filterUsers
  }
  else {
    return users
  }
}