var express     = require('express')
  , github      = require('./github')
  , index       = require('./indexing')
  , morgan      = require('morgan')
  , persistence = require('./persistence')
  , search      = require('./searching')

module.exports = function (redis, configuration) {

  var app = express()

  app.use(morgan('short'))

  app.get('/',                github)
  app.get('/index/:id/:text', function (req, res) { index(redis, req, res) })
  app.get('/search/:query',   function (req, res) { search(redis, configuration, req, res) })

  app.disable('x-powered-by')

  app.listen(process.env.PORT || 80)

}

