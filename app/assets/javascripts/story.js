function tagRefresh(url) {
  $.get(url, function(data) {
    $("html").html(data);
  });
}

var lat;
var lng;
var map;
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
  $('a.togLink').click(function() {
    if($(this).parent().hasClass('green')) {
      $(this).parent().addClass('gray').removeClass('green');
    }
    else {
      $(this).parent().addClass('green').removeClass('gray');
    }
  });
  if($('#smallmap').length > 0) {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      latlng = new google.maps.LatLng(lat, lng);
      map.setCenter(latlng);
    });
  }
  else {
    lat = 42;
    lng = -73;
  }
  latlng = new google.maps.LatLng(lat, lng);
  var mapOptions = { center: latlng, zoom: 13 };
  map = new google.maps.Map(document.getElementById('smallmap'), mapOptions);
  map.setCenter(latlng);

  input = document.getElementById('story_place_name');
  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setTypes(['establishment']);
  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    autocomplete.bindTo('bounds', map);
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      autocomplete.bindTo('bounds', map);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
      autocomplete.bindTo('bounds', map);
    }
    marker.setIcon(({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    autocomplete.bindTo('bounds', map);

    var address = '';
    if (place.address_components) {
      address = [ (place.address_components[0] && place.address_components[0].short_name || ''), (place.address_components[1] && place.address_components[1].short_name || ''), (place.address_components[2] && place.address_components[2].short_name || '') ].join(' ');
    }
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });
  // completer = new GmapsCompleter({
  // mapElem: '#smallmap'
  // });

  // completer.autoCompleteInit({
  // country: "USA",
  // region: "US"
  // });
  }

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
