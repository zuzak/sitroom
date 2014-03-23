var exec = require('child_process').exec
var rf = require('fs').readFileSync

module.exports = function (app) {

  app.get('/about', function (req, res) {
    console.log("A")
    exec('git rev-parse --short HEAD', function (err, stdout, stderr) {
      var commit = stdout
      console.log("B")
      exec('git shortlog -s < /dev/tty', function(err, stdout, stderr) {
        console.log("C")
        var contribs = []
        stdout = stdout.split('\n')
        stdout.forEach(function (contrib) {
          contrib = contrib.trim()
          contrib = contrib.split('\t')
          contribs.push(contrib)
        })
        contribs.pop()
        exec('git log -1', function (err, stdout, stderr) {
          var diff = stdout
          exec('git symbolic-ref HEAD --short', function (err, stdout, stderr) {
            var branch = stdout
            var license = ""
            try {
              license = rf('../../LICENSE', {encoding: 'utf-8'})
            } catch (e) {
              //
            }
            res.render('about', {
              user: req.user,
              commit: commit,
              contribs: contribs,
              diff: diff,
              branch: branch
            })
          })
        })
      })
    })
  })
}

