var index       = require('./indexing')
  , persistence = require('./persistence')
  , redis       = require('redis')
  , search      = require('./searching')

module.exports = function () {

  var that               = this
    , client             = createClient(arguments)

  // reads __vocabulary and __errors
  persistence.retrieve.configuration(client).then(function (err, configuration) {

    if (err) exit(err)

    that.search = function (query, callback) { return search(client, query, configuration, callback) }

    that.index  = function (id, text) { return index(client, id, text) }

  })

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

