#! /usr/bin/env node

var persistence = require('../lib/persistence')
  , web         = require('../lib/web')

var redis = persistence.client(exit)
persistence.retrieve.configuration(redis, function (err, configuration) {

  if (err) exit(err)
  web(redis, configuration)

})

function exit (error) {
  console.error(error)
  process.exit(1)
}

