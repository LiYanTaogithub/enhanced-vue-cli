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

### 创建Vue组件：

````shell
enhancedVue addcpn YourComponentName # 例如enhancedVue add NavBar，默认会存放到src/components文件夹中
enhancedVue addcpn YourComponentName -d src/pages/home # 也可以指定存放的具体文件夹
````


