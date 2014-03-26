/**
 * The entry point for the app proper.
 *
 * Initialises the server and loads all routes in ./routes.
 */

var express = require('express')
var config = require('./config')
var minify = require('express-minify')

var app = module.exports = express()

app.use(express.logger('dev'))

app.use(minify())
app.use(express.static(__dirname + '/public'))

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')


app.listen(config.get('port', config.get('ip')))

// routes
require('./routes/home')(app)
require('./routes/about')(app)
require('./routes/marco')(app)
require('./routes/imgur')(app)
require('./routes/news')(app)
require('./routes/system')(app)
require('./routes/comics')(app)
require('./routes/wmf')(app)
require('./routes/wiki')(app)
require('./routes/shipping')(app)
require('./routes/error')(app) // should always be last

