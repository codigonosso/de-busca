var index       = require('./indexing')
  , persistence = require('./persistence')
  , q           = require('q')
  , redis       = require('redis')
  , search      = require('./searching')

module.exports = function () {

  var that               = this
    , client             = createClient(arguments)
    , retrieveVocabulary = q.nfbind(persistence.retrieveVocabulary)
    , retrieveErrors     = q.nfbind(persistence.retrieveErrors)

  // reads __vocabulary
  retrieveVocabulary(client).then(function (vocabulary) {

    // then reads __errors
    return retrieveErrors(client).then(function (errors) {

      // reads in a "search engine fashion"
      that.search = function (query, callback) { return search(client, query, vocabulary, errors, callback) }

      // writes in a "search engine fashion"
      that.index  = function (id, text) { return index(client, id, text) }

    })
  })

  // if there's a problem with the configuration we quit
  .fail(exit)

  // here we go
  .done()

}

function createClient () {

  // if the first argument is already a redis client we use it, else we try to create a new one
  var client = arguments[0] instanceof redis.RedisClient ? arguments[0] : redis.createClient.apply(this, arguments)

  // if there's a problem with Redis connection we quit
  client.on('error', exit)

  return client

}

function exit (error) {

  // stderr for you
  console.error(error)

  // bye-bye
  process.exit(1)

}

