var bitap         = require('bitap')
  , indexToWord   = require('index-to-word')
  , normalize     = require('normalization')
  , wagnerFischer = require('wagner-fischer')

module.exports = function (redis, query, vocabulary, stopWords, errors) {

  // tokenizing the query
  var queryWords = pattern.split(' ')

  // removing empty words
  queryWords = words.filter(function (word) { return word })

  // normalizing
  queryWords = normalize(pattern)

  // removing stop words
  queryWords = brStopWords.filter(words)

  // here goes the vocabulary words that have been match
  var matches = [ ]

  queryWords.foreach(function (word) {

    // finding the matches in the vocabulary
    var indexes = bitap(vocabulary, word, errors)

    // if there's any match
    if (indexes.length) {

      var winner , winnerDistance

      // for each index matched in vocabulary
      indexes.foreach(function (index) {

        // get the vocabulary word
        var vocabularyWord = indexToWord(vocabulary, index)

        // find out how different it is from the word in the pattern
        var distance = wagnerFischer(vocabularyWord, patternWord)

        // sets as a winner if it is
        if (!winnerDistance || distance < winnerDistance) {
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
  matches.foreach(function (match) {
    redis.get(match, function (err, reply) {
      if (err) throw err
      ids.concat(reply)
    })
  })

  return ids

  // TODO match on WORD-AND-ID index

}

