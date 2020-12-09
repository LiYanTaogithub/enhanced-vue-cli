# 说明文档
## `enhanced-vue-cli`: 加强版的vue-cli,帮助你快速搭建和开发前端项目

如何安装？

```shell
npm install enhanced-vue-cli -g
```

## 创建项目

vue项目模块已经帮你配置：

* 功能：（你可以在此基础上修改）
* 在vue.config.js中配置了别名，配置了代理服务器，配置了项目优化相关的功能，如代码分割、打包速度优化、加载速度优化等，你可以根据项目实际需要配置CDN等）
* 封装了axios网络请求
* vue-router动态路由加载
* vuex 全局状态管理
* 登录鉴权
* 使用eslint+husky+prettier+lint-staged构建代码检查工作流

创建项目

```shell
enhancedVue create your_project_name
```

自动拉取项目模板、安装项目依赖、打开浏览器 `http://localhost:8080/`、自动启动项目



## 项目开发

项目开发目前提供三个功能：

* 创建Vue组件
* 创建Vue页面，并配置路由
* 创建Vuex子模块



### 创建Vue组件：

````shell
enhancedVue addcpn YourComponentName # 例如enhancedVue add NavBar，默认会存放到src/components文件夹中
enhancedVue addcpn YourComponentName -d src/pages/home # 也可以指定存放的具体文件夹
````



### 创建Vue页面，并配置路由

```shell
enhancedVue addpage YourPageName # 例如enhancedVue addpage Home，默认会放到src/pages/home/Home.vue中，并且会创建src/page/home/router.js
enhancedVue addpage YourPageName -d src/views # 也可以指定文件夹，但需要手动集成路由
```

为什么会创建router.js文件：

* `router.js`文件是路由的其中一个配置；
* 创建该文件中 `src/router/index.js`中会自动加载到路由的 `routes`配置中，不需要手动配置了（如果是自己配置的文件夹需要手动配置）

`src/router/index.js`中已经完成如下操作：

```js
// 动态加载pages中所有的路由文件
const files = require.context('@/pages', true, /router\.js$/);
const routes = files.keys().map(key => {
  const page = require('@/pages' + key.replace('.', ''));
  return page.default;
})
```



### 创建Vuex子模块

```shell
enhancedVue addstore YourVuexChildModuleName # 例如enhancedVue addstore home，默认会放到src/store/modules/home/index.js和types.js
enhancedVue addstore YourVuexChildModuleName -d src/vuex/modules # 也可以指定文件夹
```

创建完成后，不需要手动配置，已经动态将所有子模块集成进去：

```js
// 动态加载modules
const modules = {}
const files = require.context('./', true, /index\.js$/);
files.keys().filter(key => {
  if (key === './index.js') return false;
  return true
}).map(key => {  
  // 获取名字
  const modulePath = key.replace('./modules/', '');
  const moduleName = modulePath.replace('/index.js', '');
  const module = require(`${key}`);

  modules[`${moduleName}`] = module.default;
})
```