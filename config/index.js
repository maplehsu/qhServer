const monk = require('monk')

module.exports = {
  node: {
    port: 7777
  },
  db: function (collection) {
    const url = 'logdbuser:userlogdb@10.100.136.145:27017/logdb'
    const db = monk(url)
    return db.get(collection)
  }
}