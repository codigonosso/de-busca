var envvar = require('prefixed-envvar')

exports.redis = {
    url:      envvar('DE_BUSCA', 'REDIS_URL') || 'redis://localhost:6379'
  , password: envvar('DE_BUSCA', 'REDIS_PASSWORD')
}

exports.auth = envvar('DE_BUSCA', 'AUTH')

