var redis = require('redis')

exports.createClient = function () { return new Mock() }

function Mock () {

  var that = this

  // the database that we'll check against
  this.db = { }

  // our version of redis' sadd
  this.sadd = function (key, value) {
    if (!(key in that.db)) that.db[key] = [ value ]
    else if (that.db[key].indexOf(value) === -1) that.db[key].push(value)
  }

  // our version of redis' get
  this.get = function (key, callback) { callback(null, that.db[key]) }

}

// making it a RedisClient
Mock.prototype = redis.RedisClient.prototype

