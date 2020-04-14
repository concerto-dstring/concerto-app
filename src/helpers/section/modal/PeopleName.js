const users = [{
  smallName:'ZT',
  userName:'Zhang Tao',
  faceColor:'#f4617f',
  userUrl: 'https://www.baidu.com?zhangtao'
},{
  smallName:'LC',
  userName:'Lucy Chen',
  faceColor:'#66cdff',
  userUrl: 'https://www.baidu.com?lucychen'
},{
  smallName:'L',
  userName:'Leo',
  faceColor:'#f49642',
  userUrl: 'https://www.baidu.com?leo'
},{
  smallName:'JM',
  userName:'Jack Ma',
  faceColor:'#79cdcd',
  userUrl: 'https://www.baidu.com?jackma'
},{
  smallName:'CW',
  userName:'Civen Wang',
  faceColor:'#f4617f',
  userUrl: 'https://www.baidu.com?civenwang'
}, {
  smallName:'LW',
  userName:'Li Wei',
  faceColor:'#9370DB',
  userUrl: 'https://www.baidu.com?liwei',
}, {
  smallName:'JGZ',
  userName:'Jiang Guangzhou',
  faceColor:'#AFEEEE',
  userUrl: 'https://www.baidu.com?jiangguangzhou',
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