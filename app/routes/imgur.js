var request = require('request')
var config = require('../config')
module.exports = function (app) {
  app.get('/api/imgur.json', function (req, res) {
    request.get('https://api.imgur.com/3/gallery/hot/time/0.json',
      {
        headers: {
          'Authorization': 'Client-ID ' + config.get('imgurid')
        }
      },  function (e, r, b) {
          if (e) {
          res.status(500)
          res.json({error: e})
        } else {
          var data = JSON.parse(b)
          res.json(data.data[0])
        }
    })
  })
}
