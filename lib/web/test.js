var internalError = require('./internal-error')
  , persistence   = require('../persistence')

module.exports = function (redis, res) {

  persistence.retrieve.configuration(redis, function (err) {
    internalError(err, res) || res.sendStatus(200)
  })

}

