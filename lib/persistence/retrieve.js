var async = require('async')

module.exports = function (redis, words, callback) {

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

