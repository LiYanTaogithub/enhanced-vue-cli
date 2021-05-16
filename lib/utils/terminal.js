/**
 * 执行终端命令相关
 */
const { spawn, exec } = require('child_process');


const spawnCommand = (...args) => {
  return new Promise((resole, reject) => {
    const childProcess = spawn(...args); // 这个函数会创建异步进程
    // 让用户看到这个安装过程
    childProcess.stdout.pipe(process.stdout); //标准输出流 process 全局对象，通过它我们可以获取，运行该程序的用户，环境变量等信息。
    childProcess.stderr.pipe(process.stderr); // 标准错误流
    // 执行完或者有错误了就关闭
    childProcess.on('close', () => {
      resole(); // 将执行结果返回，可以通过.then调用，也可以通过async await执行回调 
    })
  })
}

const execCommand = (...args) => {
  return new Promise((resolve, reject) => {
    exec(...args, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(stdout.replace('\n', ''));
      // console.log(stderr);
      resolve();
    })
  })
}

module.exports = {
  spawn: spawnCommand,
  exec: execCommand
};
