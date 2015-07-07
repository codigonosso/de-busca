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

exports.retrieveErrors = function (redis, callback) { redis.get('__errors', callback) }

exports.retrieveVocabulary = function (redis, callback) { redis.smembers('__vocabulary', callback) }

exports.retrieveWordOnlyIndexes = function (redis, words, callback) {
  async.map(words, redis.get, function (err, ids) {

    if (!err) ids = ids.reduce(flatten).filter(empty).sort(ascending).filter(duplicated)
    process.nextTick(function () { callback(err, ids) })

  })
}

function flatten (previous, current) { return previous.concat(current) }

function empty (element) { return element }

function ascending (previous, current) { return previous - current }

function duplicated (element, i, array) { return !i || element != array[i - 1] }

