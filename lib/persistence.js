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

exports.retrieveErrors = function (redis, callback) {
  redis.get('__errors', function (err, errors) {
    if (!err) {
      if (/^\d+$/.test(errors)) errors = parseInt(errors)
      else err = errors + ' is not a positive integer!'
    }
    process.nextTick(function () { callback(err, errors) })
  })
}

exports.retrieveVocabulary = function (redis, callback) { redis.get('__vocabulary', callback) }

exports.retrieveWordOnlyIndexes = function (redis, words, callback) {
  async.concat(words, redis.smembers.bind(redis), function (err, ids) {

    if (!err && ids && ids.length) ids = ids.filter(empty).sort(ascending).filter(duplicated)
    process.nextTick(function () { callback(err, ids) })

  })
}

function empty (element) { return element }

function ascending (previous, current) { return previous - current }

function duplicated (element, i, array) { return !i || element != array[i - 1] }

