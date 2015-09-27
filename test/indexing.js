var assert   = require('assert')
  , indexing = require('../lib/indexing')

describe('indexing', function () {

  it('should index correctly', function () {

    var keywords = indexing('\
É bom\n\
Passar uma tarde em Itapuã\n\
Ao sol que arde em Itapuã\n\
Ouvindo o mar de Itapuã\n\
Falar de amor em Itapuã')

    assert.deepEqual(keywords, {
        bom:     [ 0 ]
      , passar:  [ 1 ]
      , uma:     [ 2 ]
      , tarde:   [ 3 ]
      , itapua:  [ 4, 7, 10, 13 ]
      , sol:     [ 5 ]
      , arde:    [ 6 ]
      , ouvindo: [ 8 ]
      , mar:     [ 9 ]
      , falar:   [ 11 ]
      , amor:    [ 12 ]
    })

  })

})

