var assert     = require('assert')
  , mock       = require('./redis-mock')
  , searching  = require('../lib/searching')

describe('searching', function () {

  it('should match one vocabulary word', function (done) {
    var redis         = mock.createClient()
      , query         = 'Visita deve consolidar o Brasil como maior aliado dos EUA na América Latina'
      , configuration = {
            vocabulary: 'argentina bolivia brasil chile colombia equador guiana paraguai peru suriname uruguai venezuela'
          , errors:     0
        }

    redis.db['word:argentina'] = [  0 ]
    redis.db['word:bolivia']   = [  1 ]
    redis.db['word:brasil']    = [  2 ]
    redis.db['word:chile']     = [  3 ]
    redis.db['word:colombia']  = [  4 ]
    redis.db['word:equador']   = [  5 ]
    redis.db['word:guiana']    = [  6 ]
    redis.db['word:paraguai']  = [  7 ]
    redis.db['word:peru']      = [  8 ]
    redis.db['word:suriname']  = [  9 ]
    redis.db['word:uruguai']   = [ 10 ]
    redis.db['word:venezuela'] = [ 11 ]

    searching(redis, query, configuration, function (err, ids) {
      assert.ifError(err)
      assert.deepEqual(ids, [ 2 ])
      done()
    })

  })

  it('should match two vocabulary words', function (done) {
    var redis         = mock.createClient()
      , query         = 'Uruguai e Paraguai pedem fim de barreiras não tarifárias no Mercosul'
      , configuration = {
            vocabulary: 'argentina bolivia brasil chile colombia equador guiana paraguai peru suriname uruguai venezuela'
          , errors:     0
        }

    redis.db['word:argentina'] = [  0 ]
    redis.db['word:bolivia']   = [  1 ]
    redis.db['word:brasil']    = [  2 ]
    redis.db['word:chile']     = [  3 ]
    redis.db['word:colombia']  = [  4 ]
    redis.db['word:equador']   = [  5 ]
    redis.db['word:guiana']    = [  6 ]
    redis.db['word:paraguai']  = [  7 ]
    redis.db['word:peru']      = [  8 ]
    redis.db['word:suriname']  = [  9 ]
    redis.db['word:uruguai']   = [ 10 ]
    redis.db['word:venezuela'] = [ 11 ]

    searching(redis, query, configuration, function (err, ids) {
      assert.ifError(err)
      assert.deepEqual(ids, [ 7, 10 ])
      done()
    })

  })

})

