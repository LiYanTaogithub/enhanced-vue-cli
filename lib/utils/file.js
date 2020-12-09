const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const log = require('./log');

const ejsCompile = (templatePath, data={}, options = {}) => {
  // ejs.renderFile(templatePath, {data}, options, (err, str) => {
  //   if (err) {  
  //     return;
  //   }
    // callback(); // 执行回调
  // })
  // 将上面改写成 promise
  return new Promise((resolve, reject) => {
    // renderFile 渲染哪个ejs模板文件
    ejs.renderFile(templatePath, {data}, options, (err, str) => {
      if (err) {
        reject(err);  // 将错误抛出
        return;
      }
      resolve(str); // 将结果输出
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

const mkdirSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    // 不存在,判断父亲文件夹是否存在？
    if (mkdirSync(path.dirname(dirname))) {
      // 存在父亲文件，就直接新建该文件
      fs.mkdirSync(dirname)
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