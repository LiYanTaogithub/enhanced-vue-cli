# 说明文档
## `enhanced-vue-cli`: 加强版的vue-cli,帮助你快速搭建和开发前端项目

如何安装？

```shell
npm install enhanced-vue-cli -g
```

## 功能

vue项目模块已经帮你配置：

* 功能：（你可以在此基础上修改）
* 在vue.config.js中配置了别名，配置了代理服务器，配置了项目优化相关的功能，如代码分割、打包速度优化、加载速度优化等，你可以根据项目实际需要配置CDN等）
* 封装了axios网络请求
* vue-router动态路由加载
* vuex 全局状态管理
* 登录鉴权
* 使用eslint+husky+prettier+lint-staged构建代码检查工作流

### 创建项目

```shell
enhancedVue create your_project_name
```

自动拉取项目模板、安装项目依赖、打开浏览器 `http://localhost:8080/`、自动启动项目

### 创建vue组件：

````shell
ls-cli addVueCpn componentName # ls-cli addVueCpn NavBar，默认会存放到 src/components文件夹中
ls-cli addVUeCpn componentName -d src/pages/home # ls-cli addVUeCpn componentName -d src/pages/home 指定具体文件夹
````
### 创建 vue page ，会默认创建一个 router.js 
```shell
ls-cli addVuePage pageName # ls-cli addVuePage Home 默认将在 src/pages 目录下创建
ls-cli addVuePage pageName -d source/temp/home # ls-cli addVuePage Home -d source/temp/home 指定目标文件夹
```
### 创建 vue store 
```shell
ls-cli addVueStore storeName # ls-cli addVueStore Home 默认将在 src/store/modules 目录下创建
```
TODO:
react 模板选择、页面组件创建
控制台打印信息完善
