const logger = require('./logger')
const cors = require('koa2-cors');
const serve = require('koa-static')
const path = require('path')

module.exports = (app) => {  
  app.use(serve(path.resolve(__dirname + '../../../uploads')))
  app.use(logger())
  app.use(
    cors({
      origin: function (ctx) {
        if (ctx.url === '/test') {
          return "*";
        }
        return 'http://localhost:8081';
      },
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'POST', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    })
  )
}