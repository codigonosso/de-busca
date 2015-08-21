var index     = require('../indexing')
  , insert    = require('../persistence/insert')
  , keywords  = require('../keywords')
  , locate    = require('positions-in-text')
  , responses = require('./responses')

module.exports = function (configuration, req, res) {

  // if it's unauthorized
  if (responses.unauthorized(configuration, req, res)) return

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
    insert(configuration.redis, req.params.id, keywords, function (err) {

      // if nothing bad happened
      if (!responses.internalError(err, res)) res.sendStatus(201)

    })

  }

  // if there isn't any keyword to index
  else res.sendStatus(204)

}

