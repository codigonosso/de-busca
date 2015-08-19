var envvarConfig  = require('../../config')
  , format        = require('format-unicorn/safe')
  , package       = require('../../../package')
  , rfile         = require('rfile')
  , util          = require('util')

var html  = rfile('./index.html')
  , ok    = color('set, ok', 'green')
  , nok   = color('set, not ok', 'red')
  , unset = color('not set', 'orange')

module.exports = function (redisConfig, res) {
  
  var status = {

      authentication: envvarConfig.auth ?
                        color('set', 'green') :
                        color('not set', 'orange')

    , vocabulary:     redisConfig.vocabulary ?
                        color('set, ok', 'green') :
                        color('not set, not ok', 'red')

    , errors:         redisConfig.errors

    , version:        package.version

    , error:          !redisConfig.vocabulary

  }

  res.set('Content-Type', 'text/html')
  res.status(status.error ? 500 : 200).send(format(html, status))

}

function color (text, color) { return util.format('<span class="color %s">%s</span>', color, text) }

