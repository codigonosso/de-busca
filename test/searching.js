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

    redis.db.argentina = [  0 ]
    redis.db.bolivia   = [  1 ]
    redis.db.brasil    = [  2 ]
    redis.db.chile     = [  3 ]
    redis.db.colombia  = [  4 ]
    redis.db.equador   = [  5 ]
    redis.db.guiana    = [  6 ]
    redis.db.paraguai  = [  7 ]
    redis.db.peru      = [  8 ]
    redis.db.suriname  = [  9 ]
    redis.db.uruguai   = [ 10 ]
    redis.db.venezuela = [ 11 ]

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

    redis.db.argentina = [  0 ]
    redis.db.bolivia   = [  1 ]
    redis.db.brasil    = [  2 ]
    redis.db.chile     = [  3 ]
    redis.db.colombia  = [  4 ]
    redis.db.equador   = [  5 ]
    redis.db.guiana    = [  6 ]
    redis.db.paraguai  = [  7 ]
    redis.db.peru      = [  8 ]
    redis.db.suriname  = [  9 ]
    redis.db.uruguai   = [ 10 ]
    redis.db.venezuela = [ 11 ]

    searching(redis, query, configuration, function (err, ids) {
      assert.ifError(err)
      assert.deepEqual(ids, [ 7, 10 ])
      done()
    })

  })

})

