# 文档结构
    > src 
        >> api  封装axios请求，处理ajax
        >> assets  放置公共文件
        >> components 组件
        >> 

# 引入依赖
## 引入antd-mobile，并实现按需打包
> npm i -S antd-mobile 
+ 要实现按需打包，就需要修改webpack的配置，因为使用了create-react-app脚手架常见应用，webpack.config.js被隐藏了，所以可以创建config-overrides.js作为webpack的扩展 

+  **安装依赖**
> npm i --save-dev babel-plugin-import customize-cra react-app-rewired
+ 进入package.json修改启动参数
> react-script => react-app-rewired

## 引入路由
> npm i -S react-router-dom

## 引入redux
> npm i -S redux react-redux redux-thunk 

> npm i --save-dev redux-devtools-extension