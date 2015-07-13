var responses = require('../responses')
  , search      = require('../../searching')

module.exports = function (redis, configuration, req, res) {
  search(redis, req.params.query, configuration, function (err, ids) {
    if (!internalError(err, res)) res.json(ids)
  })
}

