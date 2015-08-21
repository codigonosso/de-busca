var bitap         = require('bitap')
  , indexToWord   = require('index-to-word')
  , keywords      = require('./keywords')
  , wagnerFischer = require('wagner-fischer')

module.exports = function (query, configuration, callback) {

  // processing keywords
  var queryWords = keywords(query)

  // here goes the vocabulary words that have been match
  var matches = [ ]

  // for each keyword
  queryWords.forEach(function (queryWord) {

    // finding the matches in the vocabulary
    var indexes = bitap(configuration.vocabulary, queryWord, configuration.distance)

    // if there's any match
    if (indexes.length) {

      // getting the vocabulary words
      var vocabularyWords = indexes.map(function (index) { return indexToWord(configuration.vocabulary, index) })

      // finding out how different it is from the word in the query
      var distances = vocabularyWords.map(function (vocabularyWord) { return wagnerFischer(vocabularyWord, queryWord) })

      // finding what's the 'more alike' word
      var winner
      distances.forEach(function (current, i) { if (!i || current < distances[winner]) winner = i })

      // We got a winner. I said we got a winner!
      // Juice by Sara, juice by Sara, oooohhhh Sara!
      matches.push(vocabularyWords[winner])

    }

  })

  // here you go
  process.nextTick(function () { callback(matches) })

}

