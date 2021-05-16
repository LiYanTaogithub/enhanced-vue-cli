const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const log = require('./log');

const ejsCompile = (templatePath, data={}, options = {}) => {
  return new Promise((resolve, reject) => {
    // renderFile 渲染哪个ejs模板文件
    ejs.renderFile(templatePath, {data}, options, (err, str) => {
      if (err) {
        reject(err);  
        return;
      }
      resolve(str); 
    })
  })
}

const writeFile = (path, content) => {
  if (fs.existsSync(path)) {
    log.error("the file already exists~")
    return;
  }
  return fs.promises.writeFile(path, content);
}
// src/components/comone  这样一个路径的创建顺序应该是：要创建 common 首先要判断 他的父级 components 是否存在，不存在就创建 components，同样，要创建comoponents 要判断他的父级是否存在，是一个递归创建的过程
const mkdirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true
  } else {
    // 不存在,判断父亲文件夹是否存在？path.dirname 可以拿到当前路径的父路径
    if (mkdirSync(path.dirname(pathName))) {
      // 存在父亲文件，就直接新建该文件
      fs.mkdirSync(pathName)
      return true
    }
  }
}
// console.log(path.resolve(__dirname))

module.exports = {
  ejsCompile,
  writeFile,
  mkdirSync
}