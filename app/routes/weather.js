var weather = require('weather')

var params = {
  location: 'Aberystwyth'
}

module.exports = function (app) {
  app.get('/api/weather', function (req, res) {
    console.log("got")
    weather(params, function (data) {
      console.log(data)
      res.json(data)
    })
  })
}
