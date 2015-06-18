var redis = require('redis')

exports.createClient = function () {

  return {

      // the database that we'll check against
      db: { }

      // making it a RedisClient
    , __proto__: redis.RedisClient.prototype

      // our version of redis' sadd
    , sadd: function (key, value) {
        if (!(key in this.db)) this.db[key] = [ value ]
        else if (this.db[key].indexOf(value) === -1) this.db[key].push(value)
      }

      // our version of redis' get
    , get: function (key, callback) { callback(null, this.db[key]) }

  }

}

