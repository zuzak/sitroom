var os = require('os')
module.exports = function (app) {
  app.get('/api/system.json', function (req, res) {
    res.json({
      uptime: os.uptime(),
    })
  })
}
