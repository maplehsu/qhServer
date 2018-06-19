const monk = require('monk')
const multer = require('koa-multer')

module.exports = {
  node: {
    port: 7777
  },
  db: function (collection) {
    const url = 'logdbuser:userlogdb@10.100.136.145:27017/logdb'
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
  appID: 'wx5e1f8a34134f4960',
  appSecret: 'c3d8748ee90df827ceea4c176287b27d',
  wxUrl: 'http://127.0.0.1:8080/'
}