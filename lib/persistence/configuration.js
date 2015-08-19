var async = require('async')

var DEFAULT_ERRORS = 2

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
  redis.get('vocabulary', function (err, vocabulary) {

    if (!err && !vocabulary) err = 'Configure "vocabulary" on the database and restart the application!'

    process.nextTick(function () { callback(err, vocabulary) })

  })
}

function errors (redis, callback) {
  redis.get('errors', function (err, errors) {

    if (!err) {

      if (/^\d+$/.test(errors)) errors = parseInt(errors)
      else {
        if (errors) console.error('Invalid "errors": "%s".', errors)
        errors = DEFAULT_ERRORS
      }

    }

    process.nextTick(function () { callback(err, errors) })

  })
}

