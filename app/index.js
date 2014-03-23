/**
 * The entry point for the app proper.
 *
 * Initialises the server and loads all routes in ./routes.
 */

var express = require('express')
var config = require('./config')

var app = module.exports = express()

app.use(express.logger('dev'))

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.listen(config.get('port', config.get('ip')))

// routes
require('./routes/home')(app)
require('./routes/about')(app)

require('./routes/error')(app) // should always be last

