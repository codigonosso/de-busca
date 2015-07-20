var assert     = require('assert')
  , searching  = require('../lib/searching')

describe('searching', function () {

  it('should match one vocabulary word', function (done) {
    var query         = 'Visita deve consolidar o Brasil como maior aliado dos EUA na América Latina'
      , configuration = {
            vocabulary: 'argentina bolivia brasil chile colombia equador guiana paraguai peru suriname uruguai venezuela'
          , errors:     0
        }

    searching(query, configuration, function (matches) {
      assert.deepEqual(matches, [ 'brasil' ])
      done()
    })

  })

  it('should match two vocabulary words', function (done) {
    var query         = 'Uruguai e Paraguai pedem fim de barreiras não tarifárias no Mercosul'
      , configuration = {
            vocabulary: 'argentina bolivia brasil chile colombia equador guiana paraguai peru suriname uruguai venezuela'
          , errors:     0
        }

    searching(query, configuration, function (matches) {
      assert.deepEqual(matches, [ 'uruguai', 'paraguai' ])
      done()
    })

  })

})

