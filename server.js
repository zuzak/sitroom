/**
 * This is the entry point for the app.
 *
 * It counts the number of CPU cores available and forks the application
 * accordingly, to spread load in a sensible fashion.
 *
 * It also uses the USE_COVERAGE environment variable to divert coverage tests
 * into the machine-readable source if required.
 */

var cluster = require('cluster')

var appLocation = './app'

if (process.env.USE_COVERAGE) {
  appLocation = './app-cov'
}

if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length
  for (var i = 0; i < cpuCount; i++) {
    cluster.fork()
  }
} else {
  var app = require(appLocation)
}

cluster.on('exit', function(worker) {
  // the worker is dead; long live the worker
  cluster.fork()
})

