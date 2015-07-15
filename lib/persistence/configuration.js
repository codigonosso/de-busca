var async = require('async')

module.exports = function (redis, callback) {
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

function vocabulary (redis, callback) {
  redis.get('__vocabulary', function (err, vocabulary) {

    // should be configured
    if (!err && !vocabulary) err = 'Configure __vocabulary on the database!'

    process.nextTick(function () { callback(err, vocabulary) })

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

