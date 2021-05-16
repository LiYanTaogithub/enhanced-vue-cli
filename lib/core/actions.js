const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const downloadRepo = promisify(require('download-git-repo'));
const open = require('open');

const log = require('../utils/log');
const terminal = require('../utils/terminal');
const { ejsCompile, writeFile, mkdirSync } = require('../utils/file');
const repoConfig = require('../config/repo_config');

const createProjectAction = async (project, otherArg) => {  // project 项目名
  // 1.提示信息
  log.hint('leah-cli helps you create your project, please wait a moment~');
 
  // 1.clone项目从仓库 
  await downloadRepo(repoConfig.vueGitRepo, project, { clone: true });

  // 2.执行终端命令npm install
  // terminal.exec('npm install', {cwd: `./${project}`});
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  // cwd: 子进程的当前工作目录。
  await terminal.spawn(npm, ['install'], { cwd: `./${project}` });  // 第一个参数，要运行的命令，第二个参数：字符串列表，第三个可选参数：{ cwd <string> 子进程的当前工作目录。}

  // 3.运行项目
  terminal.spawn(npm, ['run', 'dev'], { cwd: `./${project}` });  // 这个进程不会结束，会阻塞后面进程的执行，两种解决方法：第一种是 在 npm run serve 之前就打开浏览器，启动成功后会自动热更新 第二种解决方法是：去掉 await

  // 4.打开浏览器
  open('http://localhost:8080/');  // open是一个库
}

const handleEjsToFile = async (name, dest, template, filename) => {
  // 1.获取模块引擎的路径
  const templatePath = path.resolve(__dirname, template);
  // 2. ejsCompile 编译
  const result = await ejsCompile(templatePath, {name, lowerName: name.toLowerCase()});

  // 3.写入文件中
  // 判断文件不存在,那么就创建文件
  mkdirSync(dest);
  const targetPath = path.resolve(dest, filename);
  writeFile(targetPath, result);
}
// 添加组件
const addComponentAction = async (name, dest) => {
  handleEjsToFile(name, dest, '../template/component.vue.ejs', `${name}.vue`);
}
// 添加page和路由
const addPageAndRouteAction = async (name, dest) => {
  // 1.编译ejs模板
  const pageRusult = await ejsCompile('vue-component.js.ejs', {name, lowerName: name.toLowerCase()});
  const routeResult = await ejsCompile('vue-router.ejs', {name, lowerName: name.toLowerCase()});
  // 写入文件
  const targetDest = path.resolve(dest, name.toLowerCase()); // addpage Home -d src/pages  ====> 文件夹： src/pages/Home 文件： Home.vue
  if(mkdirSync(targetDest)){
    const targetPagePath = path.resolve(targetDest, `${name}.vue`) // 目标文件夹
    const targetRoutePath = path.resolve(targetDest, 'router.js') // 目标文件夹
    writeFile(targetPagePath, pageRusult)
    writeFile(targetRoutePath, routeResult)
  }
}

const addStoreAction = async(name, dest) => {
  //1.编译ejs
  const storeResult = await compile('vue-store.ejs', {});
  const typeResult = await compile('vue-type.ejs', {});
  //2.创建写入文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if(mkdirSync(targetDest)){
    const targetStorePath = path.resolve(targetDest, `${name}.js`);
    const targetTypePath = path.resolve(targetDest, 'type.js');
    writeFile(targetStorePath, storeResult);
    writeFile(targetTypePath, typeResult);
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
}