var weather = require('weather')

var comics = {
  "xkcd": {
    "days": [
      "Monday",
      "Wednesday",
      "Friday"
    ],
    "url": "https://xkcd.com"
  },
  "Saturday Morning Breakfast Cereal": {
    "days": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "url": "http://smbc-comics.com"
  },
  "Dungeon Grind": {
    "days": [
      "Monday",
      "Friday"
    ],
    "url": "http://dungeongrind.co.uk"
  },
  "xkcd What-If?": {
    "days": [
      "Tuesday"
    ],
    "url": "http://what-if.xkcd.com"
  },
  "FoxTrot": {
    "days": [
      "Sunday"
    ],
    "url": "http://foxtrot.com"
  }
}

module.exports = function (app) {
  app.get('/api/comics.json', function (req, res) {
    var data = []
    for (var comic in comics) {
      console.log(comic)
      if(comics[comic].days.indexOf(todaysDate()) != -1) {
        data.push([comic, comics[comic].url])
      }
    }
    res.json(data)
  })
}

function todaysDate() {
  switch (new Date().getDay()) {
    case 0: return "Sunday"
    case 1: return "Monday"
    case 2: return "Tuesday"
    case 3: return "Wednesday"
    case 4: return "Thursday"
    case 5: return "Friday"
    case 6: return "Saturday"
  }
}
