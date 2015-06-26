var normalize = require('normalization')
  , stopWords = require('brazilian-stop-words')

module.exports = function (text) {

  // normalizing
  text = normalize(text)

  // tokenizing
  text = text.split(' ')

  // removing empty entries
  text = text.filter(function (word) { return word })

  // filtering stop words
  text = stopWords.filterWords(text)

  return text

}

