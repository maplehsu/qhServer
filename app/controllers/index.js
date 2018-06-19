const config = require('../../config/index')
const urlencode = require('urlencode');
const moment = require('moment')
const koa2Req = require('koa2-request');


module.exports = {
  error: async (ctx, next) => {    
    let db = config.db('xiaobenLog')
    let data = await db.find({"meta.res.statusCode": 500},{sort: {timestamp: -1}})    
    ctx.response.type = 'application/json'
    ctx.body = data
  },
  host: async (ctx, next) => {    
    let db = config.db('xiaobenLog')
    let data = await db.aggregate([
      {$group: {"_id": {"host": "$meta.req.headers.host"}, "total": {$sum: 1}}},
 	    {"$sort": {total: -1}}
    ])
    ctx.response.type = 'application/json'
    ctx.body = data
  },
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
    let data = await db.find({},{sort: {creatTime: -1}})
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
    let data = await db.insert(ctx.request.body)
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
  }
}