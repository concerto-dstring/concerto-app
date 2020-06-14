const sectionColors = [
  {
    color: '#FFEAB6'
  },
  {
    color: '#9BC6FF'
  },
  {
    color: '#CEB0FF'
  },
  {
    color: '#D1F7C4'
  },
  {
    color: '#E8B4FB'
  },
  {
    color: '#5DA823'
  },
  {
    color: '#009AC5'
  }
]

/**
 * 获取颜色列表并排除当前分区的颜色
 * @param {*} color 
 */
export const getSectionColors = (color) => {
  let sectionColorsCopy = sectionColors.slice()

  let filterSectiopnColors = sectionColorsCopy.filter(sectionColor => sectionColor.color !== color)

  return filterSectiopnColors
}

export const getRandomColor = () => {
  let sectionColorsCopy = sectionColors.slice()
  let index = Math.floor((Math.random()*sectionColorsCopy.length))

  return sectionColorsCopy[index].color
}