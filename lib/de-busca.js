var index = require('./indexing')

module.exports = function (redis) {
  this.index = function (id, text) { return index(redis, id, text) }
}

