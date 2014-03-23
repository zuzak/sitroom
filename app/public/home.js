var doUpdate = false, timer = 0
$(document).ready(function() {
  updateTimes(true)
  perrenial()

  $('.timer').hide()

  $('.toggle').click(function () {
    if (doUpdate) {
      doUpdate = false
      $('.toggle').text('Auto-update off')
      $('.timer').fadeOut()
    } else {
      doUpdate = 30
      $('.toggle').text('Updating every ' + doUpdate + ' seconds')
      perrenial()
      timer = doUpdate
      console.log("A")
      $('.timer').fadeIn()
    }
  })

})
  
  
function perrenial() {
  $.getJSON('api/marco.json', function(data) {
    if (data.message) {
      $('.marco').text('Marco is currently closed.')
      $('.marco').parent('div').addClass('panel-warning')
    } else {
      $('.marco').text('Marco can deliver in ' + data.deliver + ' minutes.')
      $('.marco').parent('div').addClass('panel-success')
    }
  })

  $.getJSON('api/imgur.json', function(data) {
    var slug = data.id.split('')
    var hex = '' 
    slug.forEach(function (letter) {
      hex += (String.charCodeAt(letter) % 16).toString(16)
    })
    $('.imgur .badge').css('background-color', '#' + hex.substr(0,6))
    var upd = new Date(0)
    upd.setUTCSeconds(data.datetime)
    $('.imgur .badge').text(((upd.getHours() + 11) % 12 + 1) + ((upd.getHours() < 12) ? "am" : "pm"))
  })
  $.getJSON('http://cabinetoffice.gsi.zuzakistan.com/census.json', function (data) {
    var entries = data.denizens
    var str = '<li class="list-group-item active"><span class="time" data-offset="0"></span><abbr class="pull-right zone" '
    str += 'title="Universal Coordinated Time">UTC</abbr></li>'
    if(entries == null) { // hide space entirely
      $('.sociallinks').removeClass('col-md-7')
      $('.sociallinks').addClass('col-md-12')
    } else {
      $('.sociallinks').removeClass('col-md-12')
      $('.sociallinks').addClass('col-md-7')
      $.each(entries, function (name) {
        str += '<li class="list-group-item"><span class="time" data-offset="' + entries[name]["offset"] + '">'
        str += '</span><abbr class="pull-right zone" title="' + entries[name]["timezoneName"].toTitleCase()
        str += '">' + entries[name]["acronym"] + '</abbr></li>';
      })
      $('.timezones').html(str)
    }
    updateTimes()
  })

  $.getJSON('http://cabinetoffice.gsi.zuzakistan.com/activity.json', function (data) {
      var str = ''
      $.each(data, function(id, datum) {
        str += '<li class="list-group-item"><span class="nick">' + datum.nick + '</span> spoke in'
        str += ' <span class="chan">' + id + '</span>' + ' <abbr class="timeago" title="'
        str += new Date(datum.time).toISOString() + '">' + new Date(datum.time).toLocaleTimeString() + '</abbr>.'
      })
      $('.activity').html(str)
      $('abbr.timeago').timeago()
  })
  $.getJSON('api/news.json', function (data) {
    var news = [1]
    data.forEach(function(datum) {
      var id = datum.url.split('-')
      id = id[id.length-1]
      news.push(id)
      var hl = $('*[data-news="' + id + '"]');
      if (hl.length == 0) {
        $('.news').append('<li class="list-group-item" data-news=' + id + '><a href="' + datum.url + '"></a></li>')
        hl = $('.news li:last')
      }
      if (datum.isBreaking == "true") {
        hl.addClass('breaking')
      } else {
        hl.removeClass('breaking')
      }
      hl.children().text(datum.headline)
    })
    $('.news li').each(function(id, li) {
      if ((news.indexOf(li.dataset.news) == -1) && (li.textContent != "BBC News")) {
        $(li).slideUp()
      }
    })

  })

    

  if (doUpdate) {
    window.setTimeout(perrenial, doUpdate * 1000)
    timer = doUpdate
    console.log("B", timer)
  }
}


function updateTimes(reboot) {
  var items = $('.timezones li .time')
  items.each(function(id, item){
    var now = new Date()
    var offset = $(item).attr('data-offset')
    var hrs = now.getUTCHours() + parseInt(offset)
    now.setHours(hrs)
//    $(item).text(now.getUTCHours() + " + " + offset + " = " + now.getHours() + " (" + foo + ")")
    $(item).text(now.toLocaleTimeString())
  })
  if (doUpdate) { 
    timer-- 
    $('.timer').text('(' + (timer) + 's)')
  }
  if (reboot) {
    window.setTimeout(updateTimes, 1000, reboot)
  }
}
// http://stackoverflow.com/a/5574446
String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
