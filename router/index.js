const router = require('koa-router')()
const koaBody = require('koa-body')
const controller = require('../app/controllers')
const config = require('../config/index')

router.post('/addLoop', koaBody(), controller.addLoop)
router.post('/upload', config.upload(), controller.upload)
router.post('/getInfo', koaBody(), controller.getInfo)
router.post('/addPath', koaBody(), controller.addPath)
router.post('/editPath', koaBody(), controller.editPath)
router.post('/editLoop', koaBody(), controller.editLoop)
router.post('/deletePath', koaBody(), controller.deletePath)
router.post('/deleteBanner', koaBody(), controller.deleteBanner)
router.post('/getToken', koaBody(), controller.token)
router.post('/addReserve', koaBody(), controller.addReserve)
router.post('/deleteReserve', koaBody(), controller.deleteReserve)
router.post('/getUserReserve', koaBody(), controller.getUserReserve)
router.post('/getPath', koaBody(), controller.getPath)
router.post('/getBanner', koaBody(), controller.getBanner)
router.post('/addBanner', koaBody(), controller.addBanner)
router.get('/getPathList', controller.getPathList)
router.get('/getBannerList', controller.getBannerList)
router.get('/getPathUser', controller.getPathUser)
router.get('/getOauth', controller.oauth)
router.get('/getSelectPath', controller.getSelectPath)
router.get('/getRandomPath', controller.getRandomPath)
router.get('/getReserve', controller.getReserve)
router.get('/getLoopList', controller.getLoopList)
router.post('/getLoop', koaBody(), controller.getLoop)
router.post('/deleteLoop', koaBody(), controller.deleteLoop)
router.post('/tenPay', koaBody(), controller.tenPay)
router.post("/addStrategy", koaBody(), controller.addStrategy)
router.get("/getStrategy",controller.getStrategy)
router.post("/getStrategyById", koaBody(), controller.getStrategyById)
router.post("/editStrategy", koaBody(), controller.editStrategy)
router.post("/deleteStrategy", koaBody(), controller.deleteStrategy)
router.get("/getSelectStrategy", koaBody(), controller.getSelectStrategy)
router.get("/getRandomStrategy", controller.getRandomStrategy)
module.exports = app => {
    app.use(router.routes())
    app.use(router.allowedMethods())
}