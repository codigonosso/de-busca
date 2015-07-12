var assert      = require('assert')
  , mock        = require('./redis-mock')
  , persistence = require('../lib/persistence')

describe('persistence', function () {

  it('shouldn\'t throw if __vocabulary and __errors is configured', function (done) {
    var redis = mock.createClient()
    redis.db.__vocabulary = 'black gray white'
    redis.db.__errors     = '2'
    persistence.retrieve.configuration(redis, function (err, configuration) {
      assert.ifError(err)
      assert.equal(configuration.vocabulary, 'black gray white')
      assert.equal(configuration.errors,     2)
      done()
    })
  })

  it('should throw if __vocabulary is not configured', function (done) {
    var redis = mock.createClient()
    persistence.retrieve.configuration(redis, function (err, configuration) {
      assert(err)
      assert(!configuration)
      done()
    })
  })

  it('should throw if __errors is not a positive integer', function (done) {
    var redis = mock.createClient()
    redis.db.__vocabulary = 'black gray white'
    redis.db.__errors     = 'foo'
    persistence.retrieve.configuration(redis, function (err, configuration) {
      assert(err)
      assert(!configuration)
      done()
    })
  })

  it('should throw if __errors is not configured', function (done) {
    var redis = mock.createClient()
    redis.db.__vocabulary = 'black gray white'
    persistence.retrieve.configuration(redis, function (err, configuration) {
      assert(err)
      assert(!configuration)
      done()
    })
  })

})

