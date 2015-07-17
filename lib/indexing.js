var keywords  = require('./keywords')
  , locate    = require('positions-in-text')

module.exports = function (text) { return locate(keywords(text)) }

