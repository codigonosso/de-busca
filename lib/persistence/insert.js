module.exports = function (redis, id, keywords) {
  for (var keyword in keywords) {
    var positions = keywords[keyword]
    redis.sadd(keyword, id)
    redis.hset(id, keyword, JSON.stringify(positions))
  }
}

