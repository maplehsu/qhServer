const monk = require('monk')
const multer = require('koa-multer')

module.exports = {
  node: {
    port: 7777
  },
  db: function (collection) {
    // 超级管理员 账号 admin 密码 admin
    // qinghai数据库 账号 qinghai 密码 810600
    const url = 'qinghai:810600@47.104.235.123:27017/qinghai'
    const db = monk(url)
    return db.get(collection)
  },
  upload: function () {
    //配置  
    const storage = multer.diskStorage({  
      //文件保存路径  
      destination: function (req, file, cb) {  
        cb(null, 'uploads/')  
      },  
      //修改文件名称  
      filename: function (req, file, cb) {  
        var fileFormat = (file.originalname).split(".");  
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
      }  
    })  
    //加载配置  
    const upload = multer({ storage: storage }); 
    return upload.single('file')
  },
  appID: 'wxb6810f4880118c0b',
  appSecret: 'e77a403e1619f33dda8a5ee83ab380ce',
  wxUrl: 'http://www.izmqh.com/'
}