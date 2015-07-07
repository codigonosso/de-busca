var index       = require('./indexing')
  , persistence = require('./persistence')
  , q           = require('q')
  , redis       = require('redis')
  , search      = require('./searching')

module.exports = function () {

  var that = this

  // if the first argument is already a redis client we use it, else we try to create a new one
  var client = arguments[0] instanceof redis.RedisClient ? arguments[0] : redis.createClient.apply(this, arguments)

  client.on('error', exit)

  var retrieveVocabulary = q.nfbind(persistence.retrieveVocabulary)
    , retrieveErrors     = q.nfbind(persistence.retrieveErrors)

  retrieveVocabulary(client).then(function (vocabulary) {
    return retrieveErrors(client).then(function (errors) {

      that.search = function (query, callback) { return search(client, query, vocabulary, errors, callback) }
      that.index  = function (id, text) { return index(client, id, text) }

    })
  })
  .fail(exit)
  .done()

}

function exit (error) {
  console.error(error)
  process.exit(1)
}

