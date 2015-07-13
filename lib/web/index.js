var express     = require('express')
  , morgan      = require('morgan')
  , persistence = require('./persistence')
  , routes      = require('./routes')

module.exports = function (redis, configuration) {

  var app = express()

  app.use(morgan('short'))

  app.get('/',                routes.root)
  app.get('/index/:id/:text', function (req, res) { routes.index(redis, req, res) })
  app.get('/search/:query',   function (req, res) { routes.search(redis, configuration, req, res) })

  app.disable('x-powered-by')

  app.listen(process.env.PORT || 80)

}

