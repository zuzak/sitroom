var utsire = require('utsire')
module.exports = function (app) {
  app.get('/api/shippingforecast.json', function (req, res) {
    utsire.get(function (data) {
      res.json(data)
    })
  })
}
