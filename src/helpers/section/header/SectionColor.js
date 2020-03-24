const sectionColors = [
  {
    color: '#4682B4'
  },
  {
    color: '#CD5C5C'
  },
  {
    color: '#79CDCD'
  },
  {
    color: '#90EE90'
  },
  {
    color: '#EE7AE9'
  },
  {
    color: '#FFD700'
  },
  {
    color: '#A52A2A'
  },
  {
    color: '#F4A460'
  },
  {
    color: '#FF6A6A'
  },
  {
    color: '#BEBEBE'
  },
  {
    color: '#54FF9F'
  },
  {
    color: '#A020F0'
  },
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