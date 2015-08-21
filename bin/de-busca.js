#! /usr/bin/env node

var connect       = require('../lib/persistence/connect')
  , configuration = require('../lib/configuration')
  , web           = require('../lib/web')

connect(configuration)
web(configuration)

