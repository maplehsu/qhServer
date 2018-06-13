const config = require('../../config/index')

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
  path: async (ctx, next) => {
    let db = config.db('xianlu')
    let data = await db.find({})
    ctx.response.type = 'application/json'
    ctx.body = data
  },
  addPath: async (ctx, next) => {
    console.log(ctx.request.body);
    let data = ctx.request.body
    // let db = config.db('xianlu')
    // let data = await db.find({})
    ctx.response.type = 'application/json'
    ctx.body = data
  },
}