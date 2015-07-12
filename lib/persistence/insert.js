exports.wordOnlyIndex = function (redis, id, keywords) {
  keywords.forEach(function (keyword) { redis.sadd(keyword, id) })
}

exports.wordAndIdIndex = function (redis, id, positions) {
  for (var keyword in positions) {

    var key  = id + ':' + keyword
      , sadd = function (index) { redis.sadd(key, index) }

    positions[keyword].forEach(sadd)

  }
}
