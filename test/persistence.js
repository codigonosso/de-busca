var assert      = require('assert')
  , mock        = require('./redis-mock')
  , persistence = require('../lib/persistence')

describe('persistence', function () {

  it('shouldn\'t throw if __vocabulary is configured', function (done) {
    var redis = mock.createClient()
    redis.db.__vocabulary = 'black gray white'
    persistence.retrieveVocabulary(redis, function (err, vocabulary) {
      assert.ifError(err)
      assert.equal(vocabulary, 'black gray white')
      done()
    })
  })

  it('should throw if __vocabulary is not configured', function (done) {
    var redis = mock.createClient()
    persistence.retrieveVocabulary(redis, function (err, vocabulary) {
      assert(err)
      assert.equal(vocabulary, null)
      done()
    })
  })

  it('shouldn\'t raise an error if __errors is a positive integer', function (done) {
    var redis = mock.createClient()
    redis.db.__errors = '2'
    persistence.retrieveErrors(redis, function (err, errors) {
      assert.ifError(err)
      assert.equal(errors, 2)
      done()
    })
  })

  it('should throw if __errors is not a positive integer', function (done) {
    var redis = mock.createClient()
    redis.db.__errors = 'foo'
    persistence.retrieveErrors(redis, function (err, errors) {
      assert(err)
      assert.equal(errors, null)
      done()
    })
  })

  it('should throw if __errors is not configured', function (done) {
    var redis = mock.createClient()
    persistence.retrieveErrors(redis, function (err, errors) {
      assert(err)
      assert.equal(errors, null)
      done()
    })
  })

})

