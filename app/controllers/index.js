const config = require('../../config/index')
const urlencode = require('urlencode');
const moment = require('moment')
const koa2Req = require('koa2-request');
const shortid = require('shortid');

var Payment = require('wechat-pay').Payment;
var initConfig = {
  partnerKey: "WtkUlbKeJ9466OhJoZVKN5Tnnr6UO67m",
  appId: "wxb6810f4880118c0b",
  mchId: "1510649961",
  notifyUrl: 'h5.izmqh.com'
};

var payment = new Payment(initConfig);

module.exports = {
  upload: async (ctx, next) => { 
    ctx.body = {  
      filename: ctx.req.file.filename
    }  
  },
  editPath: async (ctx, next) => {
    let db = config.db('xianlu')
    let data = await db.update({"_id": ctx.request.body._id}, {$set: ctx.request.body})
    ctx.response.type = 'application/json'
    ctx.body = '修改成功'
  },
  deletePath: async (ctx, next) => {        
    let db = config.db('xianlu')
    let data = await db.remove({"_id": ctx.request.body._id})
    ctx.response.type = 'application/json'
    ctx.body = '删除成功'
  },
  getPath: async (ctx, next) => {
    let db = config.db('xianlu')
    let data = await db.find({"pathID": ctx.request.body.pathID})
    ctx.response.type = 'application/json'
    ctx.body = data
  },
  getSelectPath: async (ctx, next) => {
    let db = config.db('xianlu')
    let data = await db.aggregate([
      {
      	$project: {"content":0}
      },
      {
        $sort: {"creatTime": -1}
      },
      {
      	$skip: ctx.request.query.skip ? parseInt(ctx.request.query.skip) : 0
      },
      {
        $limit: parseInt(ctx.request.query.limit)
      }
    ])
    let total = await db.count()
    let list = {
      data: data,
      total: total
    }
    ctx.response.type = 'application/json'
    ctx.body = list
  },
  getPathList: async (ctx, next) => {
    let db = config.db('xianlu')
    let data = await db.find({}, {content: 0})
    ctx.response.type = 'application/json'
    ctx.body = data
  },
  getPathUser: async (ctx, next) => {
    let db = config.db('xianlu')
    let data = await db.aggregate([
      {
        $lookup: {
          "from": "reserve",
          "localField": "title",
          "foreignField": "title",
          "as": "reserve_docs"
        }
      },
      {
      	$project: {"content":0}
      }
    ])    
    ctx.response.type = 'application/json'
    ctx.body = data
  },
  getInfo: async (ctx, next) => {
    let db = config.db('xianlu')
    let data = await db.find({"_id": ctx.request.body._id})
    ctx.response.type = 'application/json'
    ctx.body = data
  },
  addPath: async (ctx, next) => {
    let db = config.db('xianlu')
    ctx.request.body.creatTime = moment().format('YYYY-MM-DD kk:mm:ss')
    ctx.request.body.pathID = shortid.generate()
    db.insert(ctx.request.body)
    ctx.response.type = 'application/json'
    ctx.body = '提交成功'
  },
  oauth: async (ctx, next) => {
    const { request: req, response: res } = ctx
    let appID = config.appID
    let appSecret = config.appSecret
    let scope = 'snsapi_userinfo' // 一般授权 snsapi_base 深度授权 snsapi_userinfo
    let url = urlencode(config.wxUrl)    
    res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appID + '&redirect_uri=' + url + '&response_type=code&scope=' + scope + '&state=qinghai#wechat_redirect')
  },
  token: async (ctx, next) => {
    const { request: req, response: res } = ctx
    let appID = config.appID
    let appSecret = config.appSecret
    let code = ctx.request.body.code
    let data = await koa2Req.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appID + '&secret=' + appSecret + '&code=' + code + '&grant_type=authorization_code')
    let body = JSON.parse(data.body) 
    let user = await koa2Req.get('https://api.weixin.qq.com/sns/userinfo?access_token=' + body.access_token + '&openid=' + body.openid + '&lang=zh_CN')
    user.body = JSON.parse(user.body) 
    user.body.access_token = body.access_token
    ctx.response.type = 'application/json'
    ctx.body = user.body
  },
  addReserve: async (ctx, next) => {
    let db = config.db('reserve')
    ctx.request.body.creatTime = moment().format('YYYY-MM-DD kk:mm')
    let data = await db.insert(ctx.request.body)
    ctx.response.type = 'application/json'
    ctx.body = '预约成功'
  },
  getReserve: async(ctx, next) => {
    let db = config.db('reserve')
    let data = await db.find({}, {sort: {creatTime: -1}})
    ctx.response.type = 'application/json'
    ctx.body = data
  },
  deleteReserve: async (ctx, next) => {        
    let db = config.db('reserve')
    let data = await db.remove({"_id": ctx.request.body._id})
    ctx.response.type = 'application/json'
    ctx.body = '删除成功'
  },
  getUserReserve: async(ctx, next) => {
    let db = config.db('reserve')    
    let data = await db.find({"userID": ctx.request.body.userID},{sort: {creatTime: -1}})
    ctx.response.type = 'application/json'
    ctx.body = data
  },
  addBanner: async (ctx, next) => {
    let db = config.db('banner')
    ctx.request.body.creatTime = moment().format('YYYY-MM-DD kk:mm:ss')
    ctx.request.body.bannerID = shortid.generate()
    db.insert(ctx.request.body)
    ctx.response.type = 'application/json'
    ctx.body = '提交成功'
  },
  getBannerList: async (ctx, next) => {
    let db = config.db('banner')
    let data = await db.find({})
    ctx.response.type = 'application/json'
    ctx.body = data
  },
  deleteBanner: async (ctx, next) => {        
    let db = config.db('banner')
    let data = await db.remove({"_id": ctx.request.body._id})
    ctx.response.type = 'application/json'
    ctx.body = '删除成功'
  },
  getBanner: async (ctx, next) => {
    let db = config.db('banner')
    let data = await db.find({"bannerID": ctx.request.body.bannerID})
    ctx.response.type = 'application/json'
    ctx.body = data
  },
  tenPay: async (ctx, next) => {     
    var order = {
      body: ctx.request.body.title,
      attach: 'wx',
      out_trade_no: 'xl' + shortid.generate(),
      total_fee: ctx.request.body.fee * 100,
      spbill_create_ip: '47.104.235.123',
      openid: ctx.request.body.openId,
      trade_type: 'JSAPI'
    }
    let payargs = await payment.getBrandWCPayRequestParams(order)
    ctx.response.type = 'application/json'   
    ctx.body = payargs
  },
  // 添加攻略
  addStrategy: async(ct, next) => {
      let db = config.db('strategy')
      ctx.request.body.creatTime = moment().format('YYYY-MM-DD kk:mm')
  }
}