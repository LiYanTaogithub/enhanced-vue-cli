const program = require('commander');

const {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction,
} = require('./actions');

const createCommands = () => {
  // 创建项目指令
  program
    .command('create <project> [otherArgs...]')  // 其中command 是添加子命令  project 项目名称  otherArgs 其他参数
    .description('clone a repository into a newly created directory') // description是描述
    .action(createProjectAction); // action 是执行这个命令的回调 可以接收一个promise回调

  program
    .command('addcpn <name>')
    .description('add vue component, 例如: coderwhy addcpn NavBar [-d src/components]')
    .action(name => addComponentAction(name, program.dest || 'src/components'))

  program
    .command('addpage <page>')
    .description('add page and router config, 例如：enhancedVue addpage Home [ -d src/pages]')
    .action(page => addPageAndRouteAction(page, program.dest || 'src/pages'))

    program
    .command('addstore <store>')
    .description('add store and type config, 例如：enhancedVue addstore Home [ -d src/store/modules]')
    .action(store => addStoreAction(store, program.dest || 'src/store/modules'))
}

module.exports = createCommands;
