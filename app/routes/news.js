var request = require('request')
module.exports = function (app) {
  app.get('/api/news.json', function (req, res) {
    request.get('http://www.bbc.co.uk/news/10284448/ticker.sjson', function (e, r, b) {
      if (e) {
        res.status(500)
        res.json({error: e})
      } else {
        var data = JSON.parse(b)
        res.json(data.entries)
      }
    })
  })
}
