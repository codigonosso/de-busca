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
      , tarde:   [ 2 ]
      , itapua:  [ 3, 6, 9, 12 ]
      , sol:     [ 4 ]
      , arde:    [ 5 ]
      , ouvindo: [ 7 ]
      , mar:     [ 8 ]
      , falar:   [ 10 ]
      , amor:    [ 11 ]
    })

  })

})

