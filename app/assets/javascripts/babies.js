function bindEvents() {
  var arr = window.location.toString().split('/');
  var url = 'http://' + arr[2] + '/images/' + arr[4];
  $('#image_upload').change(function() {
    $('form#new_image').submit();
  });
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
  $.get(url + '.json', function(data) {

    if(data.width == null || data.height == null) {
      $.ajax({
        type: "PUT",
        url: url + '.json',
        data: {image: { width: $('.floater').width(), height: $('.floater').height()}}
      })
    } else {
      $('.floater').css('width', data.width);
      $('.floater').css('height', data.height);
    }

    if(data.posX == null || data.posY == null) {
      $.ajax({
        type: "PUT",
        url: url + '.json',
        data: {image: { posX: $('.floater').position().left, posY: $('.floater').position().top}}
      })
    } else {
      $('.floater').css('top', data.posY);
      $('.floater').css('left', data.posX);
    }

  });
  $('.floater').draggable({
    stop: function() {
      $.ajax({
        type: "PUT",
        url: url + '.json',
        data: {image: { posX: $('.floater').position().left, posY: $('.floater').position().top}}
      })
    }
  });
  $('.floater').resizable({
    stop: function() {
      $.ajax({
        type: "PUT",
        url: url + '.json',
        data: {image: { width: $('.floater').width(), height: $('.floater').height(), posX: $('.floater').position().left, posY: $('.floater').position().top}}
      })
    }
  })
}
$(document).ready(function() { bindEvents(); } )
$(document).on('page:load', function() { bindEvents(); } )
