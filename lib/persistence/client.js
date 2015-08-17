var config   = require('../config')
  , parseUrl = require('url').parse
  , redis    = require('redis')

module.exports = function (onError) {

  var url      = readUrl()
  var password = config.redis.password
    , client   = redis.createClient(url.port, url.hostname, { auth_pass: password })

  client.on('error', onError)

  return client

}

function readUrl () {

  var parsed = parseUrl(config.redis.url)

  if (!parsed.hostname || !parsed.port) throw new Error('"' + config.url + '" is not a valid Redis URL!')
  else return parsed

}

