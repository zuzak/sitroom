var request = require('request')
var config = require('../config')
module.exports = function (app) {
  app.get('/api/wikinews.json', function (req, res) {
    var data = {}
    var endpoint = "https://en.wikinews.org/w/api.php?action=query&format=json"
    endpoint += "&list=categorymembers&cmdir=desc&cmsort=timestamp&cmlimit=10&cmtitle="
    request.get(endpoint + "Category:Developing", function (e, r, b) {
      if (e) {
        res.status(500)
        res.json({error: e})
        return
      }
      var json = JSON.parse(b).query.categorymembers
      data.developing = []
      for(var i in json) {
        data.developing.push(json[i].title)
      }
      request.get(endpoint + "Category:Review", function (e, r, b) {
        if (e) {
          res.status(500)
          res.json({error: e})
          return
        }
        json = JSON.parse(b).query.categorymembers
        data.review = []
        for(var i in json) {
          data.review.push(json[i].title)
        }
        request.get(endpoint + "Category:Published", function (e, r, b) {
          if (e) {
            res.status(500)
            res.json({error: e})
            return
          }
          json = JSON.parse(b).query.categorymembers
          data.published = []
          for(var i in json) {
            data.published.push(json[i].title)
          }
          request.get(endpoint + "Category:Disputed", function (e, r, b) {
            if (e) {
              res.status(500)
              res.json({error: e})
              return
            }
            json = JSON.parse(b).query.categorymembers
            data.disputed = []
            for(var i in json) {
              data.disputed.push(json[i].title)
            }

            res.json(data)
          })
        })
      })
    })
  })

  app.get('/wikinews', function (req, res) {
    res.render('wikinews', {pretty:true})
  })
}
