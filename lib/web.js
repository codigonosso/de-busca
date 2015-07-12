var express     = require('express')
  , morgan      = require('morgan')
  , index       = require('./indexing')
  , persistence = require('./persistence')
  , search      = require('./searching')

module.exports = function (redis, configuration) {

  var app = express()

  app.use(morgan('short'))

  app.get('/',                redirectToGitHub)
  app.get('/index/:id/:text', function (req, res) { serveIndex(redis, req, res) })
  app.get('/search/:query',   function (req, res) { serveSearch(redis, configuration, req, res) })

  app.disable('x-powered-by')

  app.listen(process.env.PORT || 80)

}

function redirectToGitHub (req, res) {
  res.redirect('https://github.com/codigonosso/de-busca')
}

function serveIndex (redis, req, res) {
  index(redis, req.params.id, req.params.text)
}

function serveSearch (redis, configuration, req, res) {
  search(redis, req.params.query, configuration, function (err, ids) {
    if (!internalError(err, res)) res.json(ids)
  })
}

function internalError (err, res) {
  if (err) {
    console.error(err)
    res.sendStatus(500)
    return true
  } else return false
}

