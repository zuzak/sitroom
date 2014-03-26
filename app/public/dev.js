$(document).ready(function() {
  $.getJSON('/api/wikinews.json', function(data) {
    $('.reviewcount.label').text(data.count + ' pending reviews')
    if(data.count == 0) {
      $('.reviewcount.label').addClass('label-default')
    } else if (data.count > 5) {
      $('.reviewcount.label').addClass('label-danger')
    } else if (data.count > 2) {
      $('.reviewcount.label').addClass('label-warning')
    } else if (data.count == 1) {
      $('.reviewcount.label').text('1 pending review')
      $('.reviewcount.label').addClass('label-info')
    } else {
      $('.reviewcount.label').addClass('label-primary')
    }
  })
})
