var index     = require('../../indexing')
  , responses = require('../responses')

module.exports = function (redis, req, res) {

  if (badAuth(req, res)) return

  index(redis, req.params.id, req.params.text)

}
