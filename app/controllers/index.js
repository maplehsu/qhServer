const config = require('../../config/index')
const moment = require('moment')

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
    console.log(ctx.req.file)
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
  addPath: async (ctx, next) => {
    let db = config.db('xianlu')
    ctx.request.body.creatTime = moment().format('YYYY-MM-DD kk:mm:ss')
    let data = await db.insert(ctx.request.body)
    ctx.response.type = 'application/json'
    ctx.body = '提交成功'
  },
}