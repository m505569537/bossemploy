//通过此配置，实现antd的按需打包，每次引入组件，不需要另外引入样式
//此文件是对webpack配置的扩展，通过配置次文件，就不需要将webpack通过eject反编译到项目中修改了
const { override, fixBabelImports } = require('customize-cra')
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
);