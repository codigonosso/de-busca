var normalize  = require('normalization')
  , porExtenso = require('por-extenso')
  , stopWords  = require('brazilian-stop-words')

module.exports = function (text) {

  // normalizes, tokenizes, filters empty, maps numbers to in full and removes brazilian stop words
  return normalize(text)
    .split(' ')
    .map(porExtenso)
    .filter(function (word) {
      return word && (stopWords.indexOf(word) < 0 || (word === 'um' || word === 'uma'))
    })

}

