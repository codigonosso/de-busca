var redis = require('redis')

module.exports = function (configuration) {

  configuration.redis =
    redis.createClient(configuration.redis.port, configuration.redis.hostname, { auth_pass: configuration.redis.auth })

  configuration.redis.on('error', function (err) {
    console.error(err)
    process.exit(1)
  })

}

