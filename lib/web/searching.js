var async     = require('async')
  , search    = require('../searching')
  , responses = require('./responses')
  , retrieve  = require('../persistence/retrieve')

module.exports = function (configuration, req, res) {

  // if it's unauthorized
  if (responses.unauthorized(configuration, req, res)) return

  // if the vocabulary isn't configured
  if (!configuration.vocabulary) return responses.internalError(
    'Configure "vocabulary" on the database and restart the application!', res)

  // find which words matched
  search.matchWords(req.params.query, configuration, function (matches) {

    // getting the ids of the matches
    retrieve.ids(configuration.redis, matches, function (err, ids) {

      // if something bad happened
      if (responses.internalError(err, res)) return

      async.reduce(
            ids
          , { }
          , function (matchesPositions, id, callback) {
              retrieve.positions(configuration.redis, id, function (err, positions) {
                if (!err) matchesPositions[id] = positions
                callback(err, matchesPositions)
              })
            }
          , function (err, matchesPositions) {

              // if something bad happened
              if (responses.internalError(err, res)) return

              search.filterCountable(req.params.query, matchesPositions, configuration, function (ids) {

                // here are the ids
                res.json(ids)
              })

            }
      )

    })

  })

}

