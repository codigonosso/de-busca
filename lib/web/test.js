var internalError = require('./internal-error')
  , configuration = require('../persistence/configuration')

module.exports = function (redis, res) {

  configuration(redis, function (err) {
    internalError(err, res) || res.sendStatus(200)
  })

}

