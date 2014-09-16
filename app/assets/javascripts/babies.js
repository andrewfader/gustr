var teAlready;
function showTe() {
  if($('.editable').text() === "true") {
    if(window.teAlready == undefined) {
      $('.floater textarea').show();
      $('.floater .ok').show();
      $('.floater .caption').hide();
      window.teAlready = 1;
      $('.floater textarea').jqte();
      if($.trim($('.floater .caption').text() == "")) {
        $('.floater textarea').jqteVal($.trim($('.floater .caption').text()));
      }
      $('a.jqte_tool_label').click();
      $('a.jqte_tool_label').click();
    }
  }
}
function bindEvents() {
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
  var arr = window.location.toString().split('/');
  var url = 'http://' + arr[2] + '/images/' + arr[4];
  $.each($('.floater.visible'), function(index, item) {
    $(item).css('width',$(item).data('width'));
    $(item).css('height',$(item).data('height'));
    $(item).css('top',$(item).data('top'));
    $(item).css('left',$(item).data('left'));
  });
  $('#image_upload').change(function() {
    $('form#new_image').submit();
  });
  $.get(url + '.json', function(data) {

    if(data.width == null || data.height == null) {
      $.ajax({
        type: "PUT",
        url: url + '.json',
        data: {image: { width: $('.floater').width(), height: $('.floater').height()}}
      })
    } else {
      $($('.floater')[0]).css('width', data.width);
      $($('.floater')[0]).css('height', data.height);
    }

    if(data.posX == null || data.posY == null) {
      $.ajax({
        type: "PUT",
        url: url + '.json',
        data: {image: { posX: $('.floater').position().left, posY: $('.floater').position().top}}
      })
    } else {
      $($('.floater')[0]).css('top', data.posY);
      $($('.floater')[0]).css('left', data.posX);
    }

    $('.floater').show();
  });
  if($('.editable').text() === "true") {
    $($('.floater')[0]).draggable({
      containment: ".imagebox",
      stop: function() {
        $.ajax({
          type: "PUT",
          url: url + '.json',
          data: {image: { posX: $('.floater').position().left, posY: $('.floater').position().top}}
        })
      }
    });
    $($('.floater')[0]).resizable({
      stop: function() {
        $.ajax({
          type: "PUT",
          url: url + '.json',
          data: {image: { width: $('.floater').width(), height: $('.floater').height(), posX: $('.floater').position().left, posY: $('.floater').position().top}}
        })
      }
    })
  }

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
      setTimeout(function() {
        window.teAlready = undefined;
      }, 1000);
    }
  });
  $('.ok').button();
  $('.floater').click(function() { showTe(); });
  if($.trim($('.floater .caption').text() == "")) {
  }

  var completer;
  input = document.getElementById('image_place_name');
  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setTypes(['establishment']);

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    var address = '';
    if (place.address_components) {
      address = [ (place.address_components[0] && place.address_components[0].short_name || ''), (place.address_components[1] && place.address_components[1].short_name || ''), (place.address_components[2] && place.address_components[2].short_name || '') ].join(' ');
    }
    alert(address)
  });
}

$(document).ready(function() { bindEvents(); } )
$(document).on('page:load', function() { bindEvents(); } )
