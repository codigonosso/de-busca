var basicAuth = require('basic-auth')
  , envvar    = require('envvar')

module.exports = function (req, res) {
  var credentials = basicAuth(req)
  if (credentials) {
    var auth = credentials.name + ':' + credentials.pass
    if (auth === envvar.string('REDIS_AUTH')) return false
  }
  res.sendStatus(401)
  return true
}

