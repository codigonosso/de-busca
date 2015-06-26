exports.insertWords = function (redis, id, keywords) {
  keywords.forEach(function (keyword) { redis.sadd(keyword, id) })
}

exports.insertWordsPositions = function (redis, id, positions) {
  for (var keyword in positions) {

    var key = id + ':' + keyword

    positions[keyword].forEach(function (index) {
      redis.sadd(key, index)
    })

  }
}

