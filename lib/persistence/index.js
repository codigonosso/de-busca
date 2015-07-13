var redis    = require('redis')
  , parseUrl = require('url').parse

module.exports = {
    client:   require('./client')
  , insert:   require('./insert')
  , retrieve: require('./retrieve')
}

