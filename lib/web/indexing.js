var index         = require('../indexing')
  , insert        = require('../persistence/insert')
  , internalError = require('./internal-error')
  , keywords      = require('../keywords')
  , locate        = require('positions-in-text')
  , unauthorized  = require('./unauthorized')

module.exports = function (redis, req, res) {

  // if it's unauthorized
  if (unauthorized(req, res)) return

  // if it's a bad request
  if (!req.params.id || !req.body) {
    res.sendStatus(400)
    return
  }

  // index the thing
  var keywords = index(req.body)

  // if there is any keyword to index
  if (Object.keys(keywords).length) {

    // stick on redis
    insert(redis, req.params.id, keywords, function (err) {

      // if nothing bad happened
      if (!internalError(err, res)) res.sendStatus(201)

    })

  }

  // if there isn't any keyword to index
  else res.sendStatus(204)

}

