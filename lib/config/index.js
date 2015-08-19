var envvar             = require('prefixed-envvar')
  , InvalidUrl         = require('./invalid-url')
  , parseUrl 	       = require('url').parse
  , RedisNotConfigured = require('./redis-not-configured')

var redis =
  envvar('DE_BUSCA', 'REDIS') ||
  envvar('REDIS_URL')         ||
  envvar('REDISCLOUD_URL')    ||
  envvar('REDISTOGO_URL')     ||
  'redis://localhost:6379'

if (redis) {

  var url = parseUrl(redis)

  if (!url.hostname || !url.port) throw new InvalidUrl()

  if (url.auth) {
    var aux = url.auth.split(':')
    url.auth = aux[aux.length - 1]
  }

  exports.redis = url

} else throw new RedisNotConfigured()

exports.auth = envvar('DE_BUSCA', 'AUTH')


