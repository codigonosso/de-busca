var keywords    = require('./keywords')
  , locate      = require('positions-in-text')
  , persistence = require('./persistence')

module.exports = function (redis, id, text) {

  // throwing if input is no good
  if (id === undefined)   throw new Error('Pass an id!')
  if (text === undefined) throw new Error('Pass a text!')

  // processing keywords
  var words = keywords(text)

  // if we found any keyword
  if (words.length) {

    // finding their positions
    var positions = locate(words)

    // persist both (keyword, id) and (id:keyword, position)
    persistence.insertWordOnlyIndex(redis, id, words)
    persistence.insertWordAndIdIndex(redis, id, positions)

    // true, we found keywords and persisted it
    return true
  }

  // false because we didn't find any keyword and consequently nothing to persist
  return false

}

