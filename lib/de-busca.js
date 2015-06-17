var redis       = require('redis')
  , index       = require('./indexing')
  , search      = require('./searching')
  , brStopWords = require('brazilian-stop-words')

module.exports = function () {

  // if the first argument is already a redis client we use it, else we try to create a new one
  var client = arguments[0] instanceof redis.RedisClient ? arguments[0] : redis.createClient.apply(this, arguments)

  // TODO read vocabulary and errors from redis
    , vocabulary = [ ]
    , errors = 2

  // Removing vocabulary words from stop words
  brStopWords.filter(function (stopWord) { return vocabulary.indexOf(stopWord) === -1 })

  this.search = function (query) { return search(client, query, vocabulary, stopWords, errors) }
  this.index  = function (id, text) { return index(client, id, text) }

}

