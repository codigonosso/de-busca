var version = require('../../package').version

module.exports = function (req, res) {
  res.send(version)
}

