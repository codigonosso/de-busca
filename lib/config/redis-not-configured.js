function RedisNotConfigured () {
  // name and message
  this.name    = this.constructor.name
  this.message = '"REDIS" environment variable not configured.'

  // V8's stack trace
  Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)
}

// inheriting Error
RedisNotConfigured.prototype = Object.create(Error.prototype)
RedisNotConfigured.prototype.constructor = RedisNotConfigured

// here, take it
module.exports = RedisNotConfigured

