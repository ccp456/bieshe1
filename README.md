# 一个Vue单界面管理应用

------

## 快速运行

``` bash
# 安装模块
npm install

# 启动前端应用 localhost:5555
npm run dev

# 启动后端
nodemon ./server/app.js
```
## 技术栈

Vue, Vue-elementUI, node.js(Koa), mongodb

## 目录结构

```
|-- README.md //  说明文档
|-- config    //  配置
|   |-- dev.env.js  //  服务端api
|   |-- index.js    //  设置应用端口
|   |-- sql         //  mongodb数据（collection名称见models文件夹）
|       |--source
|-- src   //  Vue应用
|   |-- App.vue   //  入口文件
|   |-- page
|   |-- router
|   |-- api
|   |-- assets
|
|-- server    // 后台
|   |-- app.js
|   |-- models // 数据库数据格式
|   |-- router 
|       |-- api   // 路由至后台接口
|   |-- config
|       |-- key.js // 后台数据库配置
```