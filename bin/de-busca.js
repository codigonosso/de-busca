#! /usr/bin/env node

var client        = require('../lib/persistence/client')
  , configuration = require('../lib/persistence/configuration')
  , web           = require('../lib/web')

var redis = client(exit)
configuration(redis, function (err, configuration) {

  if (err) exit(err)
  web(redis, configuration)

})

function exit (error) {
  console.error(error)
  process.exit(1)
}

