console.log('loaded')
module.exports = function (app) {
  app.get('/', function (req, res) {
    console.log('got!')
    res.render('home')
  })
}
