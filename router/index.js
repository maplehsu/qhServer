const router = require('koa-router')()
const koaBody = require('koa-body')
const controller = require('../app/controllers')
const config = require('../config/index')

router.post('/upload', config.upload(), controller.upload)
router.post('/getInfo', koaBody(), controller.getInfo)
router.post('/addPath', koaBody(), controller.addPath)
router.post('/editPath', koaBody(), controller.editPath)
router.post('/deletePath', koaBody(), controller.deletePath)
router.post('/getToken', koaBody(), controller.token)
router.post('/addReserve', koaBody(), controller.addReserve)
router.post('/getUserReserve', koaBody(), controller.getUserReserve)
router.get('/getPath', controller.getPath)
router.get('/getPathUser', controller.getPathUser)
router.get('/error', controller.error)
router.get('/getHost', controller.host)
router.get('/getOauth', controller.oauth)
router.get('/getReserve', controller.getReserve)

module.exports = app => {
  app.use(router.routes())
  app.use(router.allowedMethods())
}


