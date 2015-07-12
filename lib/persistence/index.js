var redis = require('redis')

exports.client = function (onError) {
  var client = redis.createClient(6379, '192.168.0.105')
  client.on('error', onError)
  return client
}

exports.insert = require('./insert')

exports.retrieve = require('./retrieve')

