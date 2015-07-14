var index        = require('../indexing')
  , unauthorized = require('./unauthorized')

module.exports = function (redis, req, res) {

  if (unauthorized(req, res)) return

  index(redis, req.params.id, req.params.text)

}
