var delete_   = require('../persistence/delete')
  , responses = require('./responses')

module.exports = function (redis, req, res) {

  // if it's unauthorized
  if (responses.unauthorized(req, res)) return

  // if it's a bad request
  if (!req.params.id) {
    res.sendStatus(400)
    return
  }

  // removes from redis
  delete_(redis, req.params.id, function (err) {

    // if nothing bad happened
    if (!responses.internalError(err, res)) res.sendStatus(200)

  })

}

