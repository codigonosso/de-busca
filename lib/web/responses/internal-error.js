module.exports = function (err, res) {
  if (err) {
    console.error(err)
    res.sendStatus(500)
    return true
  } else return false
}
