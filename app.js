const Koa = require('koa')
const Config = require('./config/index')
const onerror = require('koa-onerror')
const app = new Koa()
const router = require('./router')
const middleWare = require('./app/middleware')

// 错误信息
onerror(app)
// 中间件
middleWare(app)
//路由
router(app)

app.listen(Config.node.port , () => {
  console.log('log server已运行，端口为' + Config.node.port)
})