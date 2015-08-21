var basicAuth = require('basic-auth')

exports.internalError = function (err, res) {
  if (err) {
    console.error(err)
    res.sendStatus(500)
    return true
  } else return false
}

exports.unauthorized = function (configuration, req, res) {

  // If authentication is set
  if (configuration.auth) {

    // If credentials were passed
    var credentials = basicAuth(req)
    if (credentials) {

      // If the credentials match the configuration it's not unauthorized
      var auth = credentials.name + ':' + credentials.pass
      if (auth === configuration.auth) return false

    }

    // Else it's unauthorized
    res.sendStatus(401)
    return true

  }

  // Else there's nothing to check hence it's not unauthorized
  else return false

}

