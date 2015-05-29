var normalize   = require('normalization')
  , brStopWords = require('brazilian-stop-words')

module.exports = function (text) {
  var normalized = normalize(text)
    , words      = normalized.split(' ')
    , keywords   = brStopWords.filter(words)

  return keywords
}
