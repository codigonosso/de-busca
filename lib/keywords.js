var normalize  = require('normalization')
  , porExtenso = require('por-extenso')
  , stopWords  = require('brazilian-stop-words')

module.exports = function (text) {

  // normalizes, tokenizes, filters empty, maps numbers to in full and removes brazilian stop words
  return stopWords.filterWords(normalize(text).split(' ').map(porExtenso))

}

