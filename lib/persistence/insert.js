module.exports = function (redis, id, keywords) {
  for (var keyword in keywords) {
    var positions = keywords[keyword]
    redis.sadd('word:' + keyword, id)
    redis.hset('id:' + id, keyword, JSON.stringify(positions))
  }
}

