var envvar = require('envvar')

exports.redis = {
    url:      envvar.string('DEBUSCA_REDISURL', 'redis://localhost:6379')
  , password: envvar.string('DEBUSCA_REDISPASSWORD', '') || null
}

exports.auth = envvar.string('DEBUSCA_AUTH', '')

