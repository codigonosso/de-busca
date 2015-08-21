var bodyParser = require('body-parser')
  , _delete    = require('./delete')
  , express    = require('express')
  , index      = require('./indexing')
  , morgan     = require('morgan')
  , search     = require('./searching')
  , status     = require('./status')

module.exports = function (configuration) {

  var app = express()

  app.use(bodyParser.text())
  app.use(morgan('short'))

  app.get('/',              function (req, res) { status(configuration, res) })
  app.put('/index/:id',     function (req, res) { index(configuration, req, res) })
  app.delete('/index/:id',  function (req, res) { _delete(configuration, req, res) })
  app.get('/search/:query', function (req, res) { search(configuration, req, res) })

  app.disable('x-powered-by')

  app.listen(process.env.PORT || 80)

}

