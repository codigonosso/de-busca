var async         = require('async')
  , bitap         = require('bitap')
  , indexToWord   = require('index-to-word')
  , keywords      = require('./keywords')
  , wagnerFischer = require('wagner-fischer')

exports.matchWords = function (query, configuration, callback) {

  // processing keywords
  // TODO check if it's a number
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

exports.filterCountable = function (query, matchesPositions, configuration, callback) {

  // the matched ids
  var matches = Object.keys(matchesPositions)

  // trying to filter each match
  async.filter(matches, function (id, callback) {

    var words          = query.split(' ')
      , countableWords = words.filter(function (word) { return configuration.cvocabulary.indexOf(word) >= 0 })

    // if there's no countable word in query
    if (!countableWords.length) return callback(matches)

    // for each countable word in the query
    countableWords.forEach(function (word) {

      var i = words.indexOf(word)

      // getting the preceding word in the query
      var quantity = words[i - 1]

      // if there's no preceding word in the query there's no count to match, so we just remove it
      // TODO check if it's a number
      if (!number) return callback(false)

      // a hash of word and their positions
      var positions = matchesPositions[id]

      // if the quantity find is not present in the index
      if (!(quantity in positions)) return callback(false)

      // finding out if the current query word it's present on the current match
      var hasWord = word in positions

      // if the word isn't present we shouldn't attempt to filter it
      if (!hasWord) return callback(true)

      // for each position of the word
      callback(
        positions[word].some(function (position) {

          // if the quantity in the query precedes the word in the database we have a good match
          return positions[quantity].indexOf(position - 1) >= 0

        })
      )

    })

  }, callback)

}

