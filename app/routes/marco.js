var scrape = require('scrape');
//var _ = require('underscore');

module.exports = function (app) {
  app.get('/api/marco.json', function (req, res) {
    var marco = 'http://newmarco.co.uk/new_orderorder_takeaway_in_Cardiganshire_try_Pizzas_c_64751.htm';
    scrape.request(marco, function (err, $) {
      if (err) {
        return console.error(err)
      }
      $('img').each(function (pre) {
        var time = pre.attribs.src
        var msg = "xx"
        if (time.indexOf('current_time') != -1) {
          time = time.split('_')
          time = [time[3], time[4].split('.png')[0]]
          $('span').forEach(function (span) {
            var curr = span.attribs.class
            if (curr == 'online_msg') {
              msg = span.children[0].data
            }
          })
          res.json({
            "message": msg,
            "collection": time[0],
            "delivery": time[1]
          })
        }
      })
    })
  })
}
