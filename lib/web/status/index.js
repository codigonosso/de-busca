var format  = require('format-unicorn/safe')
  , package = require('../../../package')
  , rfile   = require('rfile')
  , util    = require('util')

var html  = rfile('./index.html')
  , ok    = color('set, ok', 'green')
  , nok   = color('set, not ok', 'red')
  , unset = color('not set', 'orange')

module.exports = function (configuration, res) {
  
  var status = {

      authentication: configuration.auth ?
                        color('set', 'green') :
                        color('not set', 'orange')

    , distance:       configuration.distance

    , vocabulary:     configuration.vocabulary ?
                        color('set, ok', 'green') :
                        color('not set, not ok', 'red')

    , version:        package.version

    , error:          !configuration.vocabulary

  }

  res.set('Content-Type', 'text/html')
  res.status(status.error ? 500 : 200).send(format(html, status))

}

function color (text, colorName) { return util.format('<span class="color %s">%s</span>', colorName, text) }

