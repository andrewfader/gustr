function tagRefresh(url) {
  $.get(url, function(data) {
    $("html").html(data);
  });
}
function storyUp() {
  $('input.ui-date-picker').datepicker();

  $('ul#buttons input').hover(function() {
    $(this).css('background',"linear-gradient(#cde460,#78a139)");
  },
  function() {
    $(this).css('background','#009900');
  });
  $('ul#linkbuttons li').hover(function() {
    $(this).css('background',"linear-gradient(#cde460,#78a139)");
  },
  function() {
    $(this).css('background','#009900');
  });
  $('.hover').hover(function() {
    $(this).css('background',"linear-gradient(#cde460,#78a139)");
  },
  function() {
    $(this).css('background','');
  });
  var completer;

  completer = new GmapsCompleter({
    inputField: '#story_place_name',
    mapElem: 'null'
  });

  completer.autoCompleteInit({
    country: "USA",
    region: "US"
  });

  $('.button').button();
  $('.button.back').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    window.history.back();
  });

  if ($('table.datatable').length > 0) {
    $('table.datatable').dataTable({
      "bJQueryUI": true
    });
  }

  if ($('#map-canvas').length > 0) {
    urlfragments = document.location.toString().split('/');
    if (urlfragments[3] == "stories") {
      id = urlfragments[4]
    }
    if (urlfragments[2] == "stories") {
      id = urlfragments[3]
    }
    foo = $.getJSON('/stories/' + id + '.json', function(data, status, xhr) {
      longitude = data["longitude"];
      latitude = data["latitude"];
      var position = new google.maps.LatLng(latitude, longitude);
      var mapOptions = {
        zoom: 13,
        center: position,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      var marker = new google.maps.Marker({
        position: position,
        map: map
      });
    });
  }


}
$(document).ready(function() { storyUp(); } )
$(document).on('page:load', function() { storyUp(); } )
