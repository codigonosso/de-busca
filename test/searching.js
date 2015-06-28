var assert     = require('assert')
  , mock       = require('./redis-mock')
  , searching  = require('../lib/searching')

describe('searching', function () {

  it('should match one vocabulary word', function (done) {
    var redis = mock.createClient()
      , query = 'Cerejeira é o nome dado a várias espécies de árvores frutíferas originárias da Ásia, algumas frutíferas, outras produtoras de madeira nobre.'
      , vocabulary = 'aroeira cedro cerejeira coqueiro ipê jacarandá mogno pau-brasil pinheiro seringueira'
      , errors = 2

    redis.db.aroeira       = [ 0 ]
    redis.db.cedro         = [ 1 ]
    redis.db.cerejeira     = [ 2 ]
    redis.db.coqueiro      = [ 3 ]
    redis.db['ipê']        = [ 4 ]
    redis.db['jacarandá']  = [ 5 ]
    redis.db['mogno']      = [ 6 ]
    redis.db['pau-brasil'] = [ 7 ]
    redis.db.pinheiro      = [ 8 ]
    redis.db.seringueira   = [ 9 ]

    searching(redis, query, vocabulary, errors, function (err, ids) {
      assert.ifError(err)
      assert.deepEqual(ids, [ 2 ])
      done()
    })

  })

  it('should match two vocabulary words', function (done) {
    var redis = mock.createClient()
      , query = 'O cedro-cheiroso (Cedrela odorata), também conhecido pelos nomes vulgares de acaju, cedro-fêmea, cedro-rosa, cedro-espanhol, cedro-vermelho, cedro-mogno e cedro-brasileiro é uma árvore da família das meliáceas, com uma ampla distribuição natural, ocorrendo do México a Argentina.'
      , vocabulary = 'aroeira cedro cerejeira coqueiro ipê jacarandá mogno pau-brasil pinheiro seringueira'
      , errors = 2

    redis.db.aroeira       = [ 0 ]
    redis.db.cedro         = [ 1 ]
    redis.db.cerejeira     = [ 2 ]
    redis.db.coqueiro      = [ 3 ]
    redis.db['ipê']        = [ 4 ]
    redis.db['jacarandá']  = [ 5 ]
    redis.dbmogno          = [ 6 ]
    redis.db['pau-brasil'] = [ 7 ]
    redis.db.pinheiro      = [ 8 ]
    redis.db.seringueira   = [ 9 ]

    searching(redis, query, vocabulary, errors, function (err, ids) {
      assert.ifError(err)
      assert.deepEqual(ids, [ 1, 6 ])
      done()
    })

  })

})

