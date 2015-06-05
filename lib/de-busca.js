var redis = require('redis')
  , index = require('./indexing')

module.exports = function () {

  // if the first argument is already a redis client we use it, else we try to create a new one
  var client = arguments[0] instanceof redis.RedisClient ? arguments[0] : redis.createClient.apply(this, arguments)

  this.index = function (id, text) { return index(client, id, text) }

}

