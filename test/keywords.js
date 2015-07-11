var assert   = require('assert')
  , keywords = require('../lib/keywords')

describe('keywords', function () {

  it('should extract keywords correctly', function () {
    assert.deepEqual(
        keywords('1 é pouco, 2 é bom, 3 é demais.')
      , [ 'pouco', 'dois', 'bom', 'três', 'demais' ])
  })
})

