const {
  override,  // 重载配置
  addLessLoader,  // 自定义主题
  fixBabelImports, // 引入antd
  addDecoratorsLegacy, // 装饰器写法
} = require('customize-cra')

// 主题文件
const modifyVars = require('./theme')

module.exports = override(
  addDecoratorsLegacy(),

  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: modifyVars
  })
)