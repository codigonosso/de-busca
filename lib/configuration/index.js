var envvar             = require('prefixed-envvar')
  , InvalidUrl         = require('./invalid-url')
  , parseUrl 	         = require('url').parse
  , RedisNotConfigured = require('./redis-not-configured')

var DEFAULT_ERRORS = 2

exports.auth = envvar('DE_BUSCA', 'AUTH')

exports.errors = (function () {

  var errors = envvar('DE_BUSCA', 'ERRORS')

  if (errors) {
    if (/^\d+$/.test(errors)) errors = parseInt(errors)
    else {
      console.error('Invalid "errors": "%s".', errors)
      errors = null
    }
  }

  return errors || DEFAULT_ERRORS

})()

exports.redis = (function () {

  var url =
    envvar('DE_BUSCA', 'REDIS') ||
    envvar('REDIS_URL')         ||
    envvar('REDISCLOUD_URL')    ||
    envvar('REDISTOGO_URL')     ||
    'redis://localhost:6379'

  if (!url) throw new RedisNotConfigured()

  var parsed = parseUrl(url)

  if (!parsed.hostname || !parsed.port) throw new InvalidUrl()

  // if there's authentication specified in Redis
  if (parsed.auth) {

    // We discard the username, since Redis is password only
    var aux = url.auth.split(':')
    parsed.auth = aux[aux.length - 1]

  }

  return parsed

})()

exports.vocabulary = envvar('DE_BUSCA', 'VOCABULARY')

