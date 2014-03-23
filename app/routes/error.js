/**
 * Catch-all route for 404s and things.
 */

module.exports = function (app) {

  app.use(function (req, res, next) {
    res.status(404)
    if (req.url.indexOf('api') != -1) {
      res.json({error:404})
    } else {
      res.render('message', {
        type: 'danger',
        header: '404 Not Found',
        msg: 'Couldn\'t find ' + req.url
      })
    }
  })

  app.use(function (err, req, res, next) { // four params implies error
    console.error(err.stack)
    res.render('message', {
      type: 'danger',
      header: '500: Internal Server Error',
      msg: err.stack
    })
  })
}


