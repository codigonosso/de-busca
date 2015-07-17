var async   = require('async')
  , delete_ = require('./delete')

module.exports = function (redis, id, keywords, callback) {

  // deleting the previous index if any
  delete_(redis, id, function (err) {

    // if there's an error we end here
    if (err) process.nextTick(function () { callback(err) })

    // iterating each keyword-positions pair
    async.forEachOf(keywords, function (positions, keyword, callback) {

      // indexing the word
      redis.sadd('word:' + keyword, id, function (err) {

        // if there's an error we end here
        if (err) process.nextTick(function () { callback(err) })

        // else we index the id
        else redis.hset('id:' + id, keyword, JSON.stringify(positions), function (err) {

          // error or not here it goes
          process.nextTick(function () { callback(err) })

        })

      })

    }, callback)

  })

}

