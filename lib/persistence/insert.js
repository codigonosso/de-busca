var async = require('async')

module.exports = function (redis, id, keywords, callback) {

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

}

