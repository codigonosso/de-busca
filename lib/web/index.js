var bodyParser = require('body-parser')
  , express    = require('express')
  , github     = require('./github')
  , index      = require('./indexing')
  , morgan     = require('morgan')
  , search     = require('./searching')
  , test       = require('./test')
  , version    = require('./version')

module.exports = function (redis, configuration) {

  var app = express()

  app.use(bodyParser.text())
  app.use(morgan('short'))

  app.get('/',              github)
  app.get('/test',          function (req, res) { test(redis, res) })
  app.get('/version',       version)
  app.put('/index/:id',     function (req, res) { index(redis, req, res) })
  app.get('/search/:query', function (req, res) { search(redis, configuration, req, res) })

  app.disable('x-powered-by')

  app.listen(process.env.PORT || 80)

}

