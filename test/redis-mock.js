module.exports = function () {

  this.db = { }

  this.sadd = function (key, value) {
    if (!(key in this.db)) this.db[key] = [ value ]
    else if (this.db[key].indexOf(value) === -1) this.db[key].push(value)
  }

}


