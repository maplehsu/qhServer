const router = require('koa-router')()
const koaBody = require('koa-body')
const controller = require('../app/controllers')
const config = require('../config/index')

router.post('/upload', config.upload(), controller.upload)
router.post('/getInfo', koaBody(), controller.getInfo)
router.post('/addPath', koaBody(), controller.addPath)
router.post('/editPath', koaBody(), controller.editPath)
router.post('/deletePath', koaBody(), controller.deletePath)
router.get('/getWx', controller.wx)
router.get('/getPath', controller.getPath)
router.get('/error', controller.error)
router.get('/getHost', controller.host)

module.exports = app => {
  app.use(router.routes())
  app.use(router.allowedMethods())
}


