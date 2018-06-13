const logger = require('./logger')
const cors = require('koa2-cors');

module.exports = (app) => {
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