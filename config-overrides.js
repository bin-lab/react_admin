const { override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    //按需打包样式
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,//自动打包相关样式
    }),

    //自定义主题
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1890FF'},
    }),
);

