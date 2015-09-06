var search    = require('../searching')
  , responses = require('./responses')
  , retrieve  = require('../persistence/retrieve')

module.exports = function (configuration, req, res) {

  // if it's unauthorized
  if (responses.unauthorized(configuration, req, res)) return

  // if the vocabulary isn't configured
  if (!configuration.vocabulary) return responses.internalError(
    'Configure "vocabulary" on the database and restart the application!', res)

  // find which words matched
  search(req.params.query, configuration, function (matches) {

    // getting the ids of the matches
    retrieve(configuration.redis, matches, function (err, ids) {

      // if something bad happened
      if (responses.internalError(err, res)) return

      // else here are the ids
      else res.json(ids)

    })

  })

}

