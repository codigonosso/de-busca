var basicAuth = require('basic-auth')
  , config    = require('../config')

module.exports = function (req, res) {

  // If authentication is set
  if (config.auth) {

    // If credentials were passed
    var credentials = basicAuth(req)
    if (credentials) {

      // If the credentials match the configuration it's not unauthorized
      var auth = credentials.name + ':' + credentials.pass
      if (auth === config.auth) return false

    }

    // Else it's unauthorized
    res.sendStatus(401)
    return true

  }

  // Else there's nothing to check hence it's not unauthorized
  else return false

}

