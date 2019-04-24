# 文档结构
    > src 
        >> api  封装axios请求，处理ajax
        >> assets  放置公共文件
        >> components 组件  用来存放没有与后台进行数据交互的组件
        >> containers 用来存放有与后台进行数据交互的组件
        >> redux 用来放置redux相关文件
        >> utils 用于存放工具
        >> index.js   js入口文件
        >> Router.jsx 路由文件，引入路由器并储存一级路由

# 路由结构
**该应用判断用户是否登陆的一个关键点，就是user的_id||username||type是否存在**
路由设置的一个重点就是用户的登陆状态，
用户没有登陆  =>  登陆/注册
用户已登录 => home/....
由于一级路由会直接影响到二级路由，将所有二级路由放在/home路由之下，那么就可以只在Home组件中进行用户登录状态判断是重定向到登陆页面或者是主界面
## 一级路由
+ /login  Login 登陆
+ /register Register 注册
+ /home Home  主界面

## 二级路由均处于 /home 路由之下

+ /home/dashen  大神主界面
+ /home/laoban  老板主界面
+ /home/dashen-info  大神信息完善页面
+ /home/laoban-info  老板信息完善页面

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