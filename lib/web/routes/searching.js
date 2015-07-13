var responses = require('../responses')
  , search      = require('../../searching')

module.exports = function (redis, configuration, req, res) {

  if (badAuth(req, res)) return

  search(redis, req.params.query, configuration, function (err, ids) {
    if (!internalError(err, res)) res.json(ids)
  })

}

