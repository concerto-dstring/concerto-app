const cellRenderValues = {
  TEXT: true,
  NUMBER: true,
  SELECT: true,
  DATE: false,
  PEOPLE: false,
  STATUS: false,
};

export const getCellRenderValues = () => {
  return Object.assign({}, cellRenderValues);
};

const cellPopupHeight = {
  DATE: 400,
  PEOPLE: 364,
  STATUS: 250,
  SELECT: 200,
};

export const getCellPopupHeight = () => {
  return Object.assign({}, cellPopupHeight);
};

const cellDisplayWidth = {
  ROWSELECT: 36,
  ROWACTION: 22,
  GROUPTITLE: 360,
  SUBITEM: 80,
  PEOPLE: 120,
  STATUS: 140,
  TEXT: 140,
  DATE: 170,
  LINK: 140,
  NUMBER: 140,
  SELECT: 170,
};

export const getCellWidth = (type) => {
  return cellDisplayWidth[type];
};

export const DateCellSummaryRule = {
  EARLIEST: {
    key: 'EARLIEST',
    desc: '最早时间',
  },

  LATEST: {
    key: 'LATEST',
    desc: '最晚时间',
  },
};

export const StatusCellProperties = {
  BLOCK: {
    key: 'block',
    desc: '阻塞',
    color: '#d2515e',
    className: 'blockItem',
    index: 1,
  },

  WORKING: {
    key: 'working',
    desc: '进行中',
    color: '#fec06e',
    className: 'workingItem',
    index: 0,
  },

  FINISHED: {
    key: 'finished',
    desc: '已完成',
    color: '#5ac47d',
    className: 'finishedItem',
    index: 2,
  },

  TODO: {
    key: 'todo',
    desc: 'To Do',
    color: '#808080',
    className: 'todoItem',
    index: 3,
  },

  DEFAULT: {
    key: 'default',
    desc: '',
    color: '#c4c4c4',
    className: 'defaultItem',
    index: 4,
  },
};

export const getStatusCellClassName = (value) => {
  for (let key in StatusCellProperties) {
    if (value === StatusCellProperties[key].desc) {
      return StatusCellProperties[key].className;
    }
  }
};

export const getStatusCellMenuItems = () => {
  let menuItems = new Array(Object.keys(StatusCellProperties).length);
  for (let key in StatusCellProperties) {
    menuItems[StatusCellProperties[key].index] = StatusCellProperties[key];
  }

  return menuItems;
};
