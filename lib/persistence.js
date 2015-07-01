var async = require('async')

exports.insertWordOnlyIndex = function (redis, id, keywords) {
  keywords.forEach(function (keyword) { redis.sadd(keyword, id) })
}

exports.insertWordAndIdIndex = function (redis, id, positions) {
  for (var keyword in positions) {

    var key = id + ':' + keyword
    positions[keyword].forEach(function (index) { redis.sadd(key, index) })

  }
}

exports.retrieveWordOnlyIndexes = function (redis, words, callback) {
  async.map(words, redis.get, function (err, ids) {

    if (!err) {
        ids = ids

          // flattening the array
          .reduce(function (previous, current) { return previous.concat(current) })

          // filtering empty results
          .filter(function (id) { return id })

          // sorting
          .sort(function (previous, current) { return previous - current })

          // filtering duplicated entries
          .filter(function (id, i, array) { return !i || id != array[i - 1] })
    }

    process.nextTick(function () { callback(err, ids) })

  })
}

