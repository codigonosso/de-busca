var search    = require('../searching')
  , responses = require('./responses')
  , retrieve  = require('../persistence/retrieve')

module.exports = function (redis, configuration, req, res) {

  // if it's unauthorized
  if (responses.unauthorized(req, res)) return

  // if the vocabulary is configured
  if (configuration.vocabulary) {

    // find which words matched
    search(req.params.query, configuration, function (matches) {

      // getting the ids of the matches
      retrieve(redis, matches, function (err, ids) {

        // if nothing bad happened
        if (!responses.internalError(err, res)) res.json(ids)

      })

    })

  // if the vocabulary isn't configured
  } else responses.internalError('Configure "vocabulary" on the database and restart the application!', res)

}

