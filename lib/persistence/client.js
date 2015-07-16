var envvar   = require('envvar')
  , parseUrl = require('url').parse
  , redis    = require('redis')

module.exports = function (onError) {

  var url      = readUrl()
  var password = envvar.string('DEBUSCA_REDISPASSWORD', '') || null
    , client   = redis.createClient(url.port, url.hostname, { auth_pass: password })

  client.on('error', onError)

  return client

}

function readUrl () {

  var url    = envvar.string('DEBUSCA_REDISURL', 'redis://localhost:6379')
    , parsed = parseUrl(url)

  if (!parsed.hostname || !parsed.port) throw new Error('"' + url + '" is not a valid Redis URL!')
  else return parsed

}

