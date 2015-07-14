var envvar   = require('envvar')
  , parseUrl = require('url').parse
  , redis    = require('redis')

module.exports = function (onError) {

  var url    = readUrl()
    , client = redis.createClient(url.port, url.hostname)

  client.on('error', onError)

  return client

}

function readUrl () {

  var url    = envvar.string('DEBUSCA_REDIS', 'redis://localhost:6379')
    , parsed = parseUrl(url)

  if (!parsed.hostname || !parsed.port) throw new Error('"' + url + '" is not a valid Redis URL!')
  else return parsed

}

