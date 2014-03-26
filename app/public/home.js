var doUpdate = 30, timer = doUpdate
$(document).ready(function() {
  updateTimes(true)
  perrenial()

  if (timer == 0) {
    $('.toggle').text('Auto-update off')
    $('.timer').hide()
  } else {
    $('.toggle').text('Updating every ' + doUpdate + ' seconds')
  }

  $('.toggle').click(function () {
    if (doUpdate) {
      doUpdate = false
      var now = new Date()
      $('.toggle').html('Last updated <abbr class="timeago" title="' + now.toISOString() + '">Click to toggle auto-update.</abbr>')
      $('abbr.timeago').timeago()
      $('.timer').fadeOut()
    } else {
      doUpdate = 30
      $('.toggle').text('Updating every ' + doUpdate + ' seconds')
      perrenial()
      timer = doUpdate
      $('.timer').fadeIn()
    }
  })

  $.getJSON('api/system.json', function (data) {
    var now = new Date()
    var then = data.uptime * 1000
    var ut = new Date(Math.abs(now.getTime() - then))
    ut = ut.toISOString()
    $('footer').prepend('Server last restarted <abbr class="timeago" title="' + ut + '">' + ut + '</abbr>.')
    $('abbr.timeago').timeago()
  })

  $.getJSON('api/comics.json', function (comics) {
    $.each(comics, function (comic) {
      console.log(comic)
      $('.comics').append('<li class="list-group-item"><a href="' + comics[comic][1] + '">' + comics[comic][0] + '</a></li>')
    })
  })
})
  
  
function perrenial() {
  $.getJSON('api/marco.json', function(data) {
    if (data.message) {
      $('.marco').text('Marco is currently closed.')
      $('.marco').parent('div').addClass('panel-warning')
    } else {
      $('.marco').text('Marco can deliver in ' + data.delivery + ' minutes.')
      $('.marco').parent('div').addClass('panel-success')
    }
  })

  $.getJSON('api/imgur.json', function(data) {
    var slug = data.id.split('')
    var hex = '' 
    slug.forEach(function (letter) {
      try {
        hex += (String.charCodeAt(letter) % 16).toString(16)
      } catch (e) {
        hex += '0'
      }
    })
    $('.imgur .badge').css('background-color', '#' + hex.substr(0,6))
    $('.imgur a').attr('href', 'https://imgur.com/gallery/' + data.id)
    if (data.section) {
      $('.imgur .badge').text('r/' + data.section)
    } else {
      var upd = new Date(0)
      upd.setUTCSeconds(data.datetime)
      $('.imgur .badge').text(((upd.getHours() + 11) % 12 + 1) + ((upd.getHours() < 12) ? "am" : "pm"))
    }
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
        str += '<li class="list-group-item"><span class="nick">' + datum.nick.toTitleCase() + '</span> spoke in'
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
    $('.timer').text('(' + (timer+1) + 's)')
  }
  if (reboot) {
    window.setTimeout(updateTimes, 1000, reboot)
  }
}
// http://stackoverflow.com/a/5574446
String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
