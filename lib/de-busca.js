var index = require('./index')

module.exports = function (redis) {
  this.index = function (id, text) { return index(redis, id, text) }
}

