var async = require('async')

module.exports = function (redis, id, callback) {

  // the id key
  var idKey = 'id:' + id

  // getting the hash with words and positions
  // we're using the words in the hash to remove the id from their set
  redis.hgetall(idKey, function (err, wordsPositions) {

    // if something bad happened or there's no index we give it back
    if (err || !wordsPositions) process.nextTick(function () { callback(err) })

    // else we delete the id index
    else redis.del(idKey, function (err) {

      // if something bad happened we give it back
      if (err) process.nextTick(function () { callback(err) })
      else {

        // the word indexes keys
        var words      = Object.keys(wordsPositions)
          , wordsKeys  = words.map(function (word) { return 'word:' + word })

        // removing the id from the word index, if any
        if (wordsKeys) {
          async.each(wordsKeys, function (wordKey, callback) {
            redis.srem(wordKey, id, callback)
          }, callback)
        } else process.nextTick(function () { callback() })

      }

    })

  })

}

