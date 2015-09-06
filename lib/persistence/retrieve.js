var async = require('async')

module.exports = function (redis, words, callback) {

  // if there's no word there's nothing to do
  if (!words.length) return process.nextTick(function () { callback(null, [ ]) })

  // filters empty, sorts, filters duplicated ids and prepends word
  var normalizeIds = function (ids) {
    var empty      = function (element)           { return element }
      , ascending  = function (previous, current) { return previous - current }
      , duplicated = function (element, i, array) { return !i || element != array[i - 1] }
    return ids.filter(empty).sort(ascending).filter(duplicated)
  }

  // prepending 'word:' to the given words
  words = words.map(function (word) { return 'word:' + word })

  // getting the intersection of the matching words (it's an AND operation)
  redis.sinter(words, function (err, ids) {
    if (!err && ids && ids.length) ids = normalizeIds(ids)
    process.nextTick(function () { callback(err, ids) })
  })

}

