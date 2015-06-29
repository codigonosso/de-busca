var stopWords  = require('brazilian-stop-words')
  , normalize  = require('normalization')
  , porExtenso = require('por-extenso')

module.exports = function (text) {

  // filtering stop words
  return stopWords.filterWords(

    // normalizing
    normalize(text)

      // tokenizing
      .split(' ')

      // removing empty entries
      .filter(function (word) { return word })

      // replacing number to in full form
      .map(function (word) { return porExtenso(word) })

  )

}

