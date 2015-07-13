var index = require('../../indexing')

module.exports = function (redis, req, res) {
  index(redis, req.params.id, req.params.text)
}
