var keywords = require('../keywords')
  , locate   = require('positions-in-text')
  , persist  = require('./persist')

module.exports = function (redis, id, text) {

  // throwing if input is no good
  checkArguments(id, text)

  // processing keywords
  var words = keywords(text)

  // if we found any keyword
  if (words.length) {

    // finding their positions
    var positions = locate(words)

    // persist both (keyword, id) and (id:keyword, position)
    persist.keywords(redis, id, words)
    persist.positions(redis, id, positions)

    // true, we found keywords and persisted it
    return true
  }

  // false because we didn't find any keyword and consequently nothing to persist
  return false

}

function checkArguments (id, text) {
 if (id === undefined)   throw new Error('Pass an id!')
 if (text === undefined) throw new Error('Pass a text!')
 if (!isInteger(id))     throw new Error('id is not an integer!')
}

function isInteger (n) { return typeof n === 'number' && (n % 1 === 0) }

