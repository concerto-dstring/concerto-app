const users = [{
  id: 'user01',
  smallName:'ZT',
  userName:'Zhang Tao',
  faceColor:'#f4617f',
  userUrl: 'https://www.baidu.com?zhangtao'
}, {
  id: 'user02',
  smallName:'LC',
  userName:'Lucy Chen',
  faceColor:'#66cdff',
  userUrl: 'https://www.baidu.com?lucychen'
}, {
  id: 'user03',
  smallName:'L',
  userName:'Leo',
  faceColor:'#f49642',
  userUrl: 'https://www.baidu.com?leo'
}, {
  id: 'user04',
  smallName:'JM',
  userName:'Jack Ma',
  faceColor:'#79cdcd',
  userUrl: 'https://www.baidu.com?jackma'
}, {
  id: 'user05',
  smallName:'CW',
  userName:'Civen Wang',
  faceColor:'#f4617f',
  userUrl: 'https://www.baidu.com?civenwang'
}, {
  id: 'user06',
  smallName:'LW',
  userName:'Li Wei',
  faceColor:'#9370DB',
  userUrl: 'https://www.baidu.com?liwei'
}, {
  smallName:'JGZ',
  userName:'Jiang Guangzhou',
  faceColor:'#AFEEEE',
  userUrl: 'https://www.baidu.com?jiangguangzhou',
  createdAt: '2020-04-25T21:37:47.463Z',
  email: '1000122331@qq.com',
  fname: '蒋',
  id: '100001',
  lname: '光洲',
  phone: '18821245466',
  title: '测试者',
  usertype: 'NORMAL'
}]

export const getPeople = (userName) => {
  let usersCopy = users.slice()
  if (userName) {
    let userNameLow = userName.toLowerCase()
    let filterUsers = usersCopy.filter(user => {
      if (user.userName && user.userName.toLowerCase().indexOf(userNameLow) !== -1) {
        return user
      }
    })

    return filterUsers
  }
  else {
    return usersCopy
  }
}

export const getPeopleById = (id) => {
  let usersCopy = users.slice()
  return usersCopy.find(user => user.id === id)
}