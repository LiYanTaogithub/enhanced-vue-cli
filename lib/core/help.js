const program = require('commander');

const helpOptions = () => {
  program.option('-s --src <src>', 'a source folder');
  // <dest> 表示可选参数， 可以通过program.dest 拿到指定的路径
  program.option('-d --dest <dest>', 'a destination folder, 例如: -d src/pages, 错误/src/pages');
  // 指定选择哪个框架 vue react
  program.option('-f --framework <framework>', 'your framework name');
  // 监听help指令，可以做一些操作，比如修改指令等
  program.on('--help', function() {
    console.log("version");
  })
}

module.exports = helpOptions;
