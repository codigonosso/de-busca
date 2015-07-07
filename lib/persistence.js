var async = require('async')

exports.insertWordOnlyIndex = function (redis, id, keywords) {
  keywords.forEach(function (keyword) { redis.sadd(keyword, id) })
}

exports.insertWordAndIdIndex = function (redis, id, positions) {
  for (var keyword in positions) {

    var key  = id + ':' + keyword
      , sadd = function (index) { redis.sadd(key, index) }

    positions[keyword].forEach(sadd)

  }
}

exports.retrieveErrors = function (redis, callback) {
  redis.get('__errors', function (err, errors) {

    // if Redis didn't find a problem
    if (!err) {

      // should be configured
      if (!errors) err = 'Configure __errors on the database!'

      // should be an integer
      else if (!/^\d+$/.test(errors)) {
        err = '__errors is not a positive integer!'
        errors = null
      }

      // ok to parse
      else errors = parseInt(errors)

    }

    process.nextTick(function () { callback(err, errors) })

  })
}

exports.retrieveVocabulary = function (redis, callback) {
  redis.get('__vocabulary', function (err, vocabulary) {

    // should be configured
    if (!err && !vocabulary) err = 'Configure __vocabulary on the database!'

    process.nextTick(function () { callback(err, vocabulary) })

  })
}

exports.retrieveWordOnlyIndexes = function (redis, words, callback) {

  // filters empty, sorts and filters duplicated ids
  var normalizeIds = function (ids) {
    var empty      = function (element)           { return element }
      , ascending  = function (previous, current) { return previous - current }
      , duplicated = function (element, i, array) { return !i || element != array[i - 1] }
    return ids.filter(empty).sort(ascending).filter(duplicated)
  }


  // asynchronously calling redis.smembers for each word in words and concating the results
  // for some reason async fucks up the 'this' on redis.smembers, that's why the bind() call
  async.concat(words, redis.smembers.bind(redis), function (err, ids) {

    if (!err && ids && ids.length) ids = normalizeIds(ids)
    process.nextTick(function () { callback(err, ids) })

  })
}

