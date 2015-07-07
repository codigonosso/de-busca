var index       = require('./indexing')
  , persistence = require('./persistence')
  , q           = require('q')
  , redis       = require('redis')
  , search      = require('./searching')

module.exports = function () {

  var that = this

  // if the first argument is already a redis client we use it, else we try to create a new one
  var client = arguments[0] instanceof redis.RedisClient ? arguments[0] : redis.createClient.apply(this, arguments)

  var retrieveVocabulary = q.nfbind(persistence.retrieveVocabulary)
    , retrieveErrors     = q.nfbind(persistence.retrieveErrors)

  // TODO throw if vocabulary or errors aren't configured
  q.nfbind(persistence.retrieveVocabulary)(client).then(function (vocabulary) {
    return q.nfbind(persistence.retrieveErrors)(client).then(function (errors) {

      that.search = function (query) { return search(client, query, vocabulary, errors) }
      that.index  = function (id, text) { return index(client, id, text) }

    })
  })
  .fail(function (error) { console.error('Something bad happened: ' + error) })
  .done()

}

