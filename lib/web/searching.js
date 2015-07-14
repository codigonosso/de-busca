var internalError = require('./internal-error')
  , search        = require('../searching')
  , unauthorized  = require('./unauthorized')

module.exports = function (redis, configuration, req, res) {

  if (unauthorized(req, res)) return

  search(redis, req.params.query, configuration, function (err, ids) {
    if (!internalError(err, res)) res.json(ids)
  })

}

