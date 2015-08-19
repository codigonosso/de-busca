function InvalidUrl () {
  // name and message
  this.name    = this.constructor.name
  this.message = 'Invalid "REDIS" URL.'

  // V8's stack trace
  Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)
}

// inheriting Error
InvalidUrl.prototype = Object.create(Error.prototype)
InvalidUrl.prototype.constructor = InvalidUrl

// here, take it
module.exports = InvalidUrl

