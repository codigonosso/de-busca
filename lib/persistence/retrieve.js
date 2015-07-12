var async = require('async')

exports.configuration = function (redis, callback) {
  vocabulary(redis, function (err, vocabulary) {

    if (err) process.nextTick(function () { callback(err) })
    else errors(redis, function (err, errors) {
      var configuration = err ? null : {
          vocabulary: vocabulary
        , errors:     errors
      }
      process.nextTick(function () { callback(err, configuration) })
      
    })

  })
}

exports.wordOnlyIndexes = function (redis, words, callback) {

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

function errors (redis, callback) {
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

function vocabulary (redis, callback) {
  redis.get('__vocabulary', function (err, vocabulary) {

    // should be configured
    if (!err && !vocabulary) err = 'Configure __vocabulary on the database!'

    process.nextTick(function () { callback(err, vocabulary) })

  })
}

