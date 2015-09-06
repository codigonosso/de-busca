var envvar             = require('prefixed-envvar')
  , InvalidUrl         = require('./invalid-url')
  , parseUrl 	         = require('url').parse
  , RedisNotConfigured = require('./redis-not-configured')

var DEFAULT_DISTANCE = 2

exports.auth = envvar('DE_BUSCA', 'AUTH')

exports.distance = (function () {

  var distance = envvar('DE_BUSCA', 'DISTANCE')

  if (distance) {
    if (/^\d+$/.test(distance)) distance = parseInt(distance)
    else {
      console.error('Invalid "DISTANCE": "%s".', distance)
      distance = null
    }
  }

  return distance || DEFAULT_DISTANCE

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
    var aux = parsed.auth.split(':')
    parsed.auth = aux[aux.length - 1]

  }

  return parsed

})()

exports.vocabulary = envvar('DE_BUSCA', 'VOCABULARY')

