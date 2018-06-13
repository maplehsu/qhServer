const router = require('koa-router')()
const koaBody = require('koa-body')
const controller = require('../app/controllers')
router.get('/getPath', controller.path)
router.post('/addPath', koaBody(), controller.addPath)
router.get('/error', controller.error)
router.get('/getHost', controller.host)

module.exports = app => {
  app.use(router.routes())
  app.use(router.allowedMethods())
}


