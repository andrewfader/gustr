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
    if(data.posX == null || data.posY == null) {
      $.ajax({
        type: "PUT",
        url: url + '.json',
        data: {image: { posX: $('.floater').position().left, posY: $('.floater').position().top}}
      })
    }
    else {
      $('.floater').css('top', data.posY);
      $('.floater').css('left', data.posX);
    }
  });
  $('.floater').draggable({
    drag: function() {
      $.ajax({
        type: "PUT",
        url: url + '.json',
        data: {image: { posX: $('.floater').position().left, posY: $('.floater').position().top}}
      })
    }
  });
}
$(document).ready(function() { bindEvents(); } )
$(document).on('page:load', function() { bindEvents(); } )
