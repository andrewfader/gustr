var teAlready;
function showTe() {
    if(window.teAlready == undefined) {
      $('.floater textarea').show();
      $('.floater .ok').show();
      $('.floater textarea').jqte();
      $('.floater textarea').jqteVal($('.floater .caption').val());
      $('.floater .caption').hide();
      window.teAlready = 1;
      $('a.jqte_tool_label').click();
    }
}
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

    $('.floater').show();
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

  $('.ok').click(function() {
    if (window.teAlready = 1) {
      $.ajax({
        type: "PUT",
        url: url + '.json',
        data: {image: { caption: $('.floater textarea').val() }}
      });
      $('.floater .caption').html($('.floater textarea').val());
      $('.floater textarea').jqte();
      $('.floater .caption').show();
      $('.floater .ok').hide();
    }
  });
  $('.ok').button();
  $('.floater').click(function() { showTe(); });
  if($('.floater .caption').text() == "") {
    showTe();
  }
}

$(document).ready(function() { bindEvents(); } )
$(document).on('page:load', function() { bindEvents(); } )
