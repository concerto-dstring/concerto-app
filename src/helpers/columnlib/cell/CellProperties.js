const cellRenderValues = {
  TEXT: true,
  NUMBER: true,
  SELECT: true,
  DATE: false,
  PEOPLE: false,
  STATUS: false,
}

export const getCellRenderValues = () => {
  return Object.assign({}, cellRenderValues)
}

const cellPopupHeight = {
  DATE: 400,
  PEOPLE: 364,
}

export const getCellPopupHeight = () => {
  return Object.assign({}, cellPopupHeight)
}

const cellDisplayWidth = {
  SUBITEM: 80,
  PEOPLE: 80,
  STATUS: 140,
  TEXT: 140,
  DATE: 170,
  LINK: 140,
  NUMBER: 140,
  SELECT: 170,
}

export const getCellWidth = (type) => {
  return cellDisplayWidth[type]
}

export const DateCellSummaryRule = {
  EARLIEST: {
    key: 'EARLIEST',
    desc: '最早时间'
  },

  LATEST: {
    key: 'LATEST',
    desc: '最晚时间'
  }
}