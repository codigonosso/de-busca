var keywords      = require('./keywords')
  , indexToWord   = require('index-to-word')
  , bitap         = require('bitap')
  , wagnerFischer = require('wagner-fischer')

module.exports = function (redis, query, vocabulary, errors) {

  // processing keywords
  var queryWords = keywords(query)

  // here goes the vocabulary words that have been match
  var matches = [ ]

  queryWords.forEach(function (queryWord) {

    // finding the matches in the vocabulary
    var indexes = bitap(vocabulary, queryWord, errors)

    // if there's any match
    if (indexes.length) {

      var winner , winnerDistance

      // for each index matched in vocabulary
      indexes.forEach(function (index) {

        // get the vocabulary word
        var vocabularyWord = indexToWord(vocabulary, index)

        // find out how different it is from the word in the query
        var distance = wagnerFischer(vocabularyWord, queryWord)

        // sets as a winner if it is
        if (!winner || distance < winnerDistance) {
          winner         = vocabularyWord
          winnerDistance = distance
        }

      })

      // We got a winner. I said we got a winner!
      // Juice by Sara, juice by Sara, oooohhhh Sara!
      matches.push(winner)

    }

  })

  // the database ids of the matches
  var ids = [ ]

  // get ids from WORD-ONLY index
  matches.forEach(function (match) {
    redis.get(match, function (err, reply) {
      if (err) throw err
      ids.concat(reply)
    })
  })

  return ids

  // TODO match on WORD-AND-ID index

}

