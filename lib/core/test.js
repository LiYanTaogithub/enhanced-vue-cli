function promisify (f) {
  return function () {
    let args = Array.prototype.slice.call(arguments) // f函数的参数
    console.log(args)
    return new Promise( (resolve, reject) => {
      args.push(function(err, result) {
        console.log(err)
        console.log(result)
        if(err) reject(err)  // 错误原因
        else resolve(result) // 输出结果
      })
      f.apply(null, args) // 执行f函数
    })
  }
}

function readfile(a, b) {
  require('fs').readFile('./test.js', 'utf-8', function (err, data) {
    if (err) {
        console.log(err)
    }
    console.log(a, b, data)
})
}

console.log(promisify(readfile))
const path = require('path')
console.log(path.resolve(__dirname))