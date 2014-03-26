module.exports = function (app) {
  app.get('/wmf', function (req, res) {
    res.render('wmf',{pretty:true})
  })
}
