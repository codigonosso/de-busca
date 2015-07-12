var normalize  = require('normalization')
  , porExtenso = require('por-extenso')
  , stopWords  = require('brazilian-stop-words')

module.exports = function (text) {

  // normalizes, tokenizes, filters empty, maps numbers to in full and removes brazilian stop words
  return stopWords.filterWords(
    normalize(text).split(' ').filter(empty).map(inFull)
  )

}

function empty  (word) { return word }

function inFull (word) { return porExtenso(word) }

