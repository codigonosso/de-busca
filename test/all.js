var assert   = require('assert')
  , async    = require('async')
  , redis    = require('fakeredis')
  , util     = require('util')
  , index    = require('../lib/indexing')
  , insert   = require('../lib/persistence/insert')
  , retrieve = require('../lib/persistence/retrieve')
  , search   = require('../lib/searching')

var configuration = {
    vocabulary:  'andar corrido casa apartamento lote sala loja quarto suite vaga garagem um dois tres quatro cinco seis sete oito nove dez comprar alugar'
  , cvocabulary: 'sala quarto suite vaga'
  , distance:    2
  , redis:       redis.createClient()
}

it('all', function (done) {

  async.parallel(
      [
         async.apply(
            insert
          , configuration.redis
          , '1'
          , index('alugar lote')
        )
      , async.apply(
            insert
          , configuration.redis
          , '2'
          , index('vender comprar apartamento rua ranieri mazzili republica joao monlevade mg minas gerais predio com psicina quadra e area gourmet um garagem um vaga um suite tres quarto')
        )
      , async.apply(
            insert
          , configuration.redis
          , '3'
          , index('vender comprar casa avenida professor alfredo balena centro belo horizonte mg minas gerais possui area disponivel para construir quatro garagem quatro vaga dois suite quatro quarto')
        )
      , async.apply(
            insert
          , configuration.redis
          , '4'
          , index('alugar loja rua pernambuco ate lado par boa viagem belo horizonte mg minas gerais dois garagem dois vaga')
        )
      , async.apply(
            insert
          , configuration.redis
          , '5'
          , index('alugar apartamento rua cardeal arcoverde de a lado par pinheiros sao paulo sp sao paulo dois garagem dois vaga um suite tres quarto')
        )
      , async.apply(
            insert
          , configuration.redis
          , '6'
          , index('vender comprar lote rua ranieri mazzili republica joao monlevade mg minas gerais')
        )
    ]
    , function () {
        async.parallel(
          [
              async.apply(test, 'alugar', [ 1, 4, 5 ])
            , async.apply(test, 'comprar apartamento com piscina', [ 2 ])
            , async.apply(test, 'lote' , [ 1, 6 ])
            , async.apply(test, 'belo horizonte', [ 3, 4 ])
            , async.apply(test, 'apartamento 3 quartos' , [ 2, 5 ])
            , async.apply(test, 'apartamento um vaga', [ 2 ])
          ]
          , done
        )
      }
  )
})

function test (query, expected, callback) {

  search.matchWords(query, configuration, function (matches) {

    retrieve.ids(configuration.redis, matches, function (err, ids) {

      assert.ifError(err)

      async.reduce(
          ids
        , { }
        , function (matchesPositions, id, callback) {
            retrieve.positions(configuration.redis, id, function (err, positions) {
              if (!err) matchesPositions[id] = positions
              callback(err, matchesPositions)
            })
          }
        , function (err, matchesPositions) {
            assert.ifError(err)
            search.filterCountable(query, matchesPositions, configuration, function (actual) {
              assert.deepEqual(actual, expected, util.format('failed at "%s" search', query))
            })
            callback()
          }
      )

    })

  })

}

