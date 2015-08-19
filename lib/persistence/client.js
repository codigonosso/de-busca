var config   = require('../config')
  , parseUrl = require('url').parse
  , redis    = require('redis')

module.exports = function (onError) {

  var client = redis.createClient(config.redis.port, config.redis.hostname, { auth_pass: config.redis.auth })

  client.on('error', onError)

  return client

}

