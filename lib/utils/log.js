//然后命令行默认的字体颜色是黑白色的，
//我们可以引入一些命令行交互的包，不得不说这些写包的大佬是真牛逼，啥都能写
const chalk = require('chalk');

const hint = (...info) => {
  console.log(chalk.blue(info));
}

const error = (...info) => {
  console.log(chalk.red(info));
}

const clear = () => {
  console.clear();
}

module.exports = {
  hint,
  error,
  clear
}