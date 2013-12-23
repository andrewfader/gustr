function resizeBg() {
  $('#map-canvas').css('height',$(window).height());
  $('#map-canvas').css('width',$(window).width());
  $('body').css('height',$(window).height());
  $('body').css('width',$(window).width());
}
var map;
var autocomplete;
var geocoder = new google.maps.Geocoder();
var toppanel = '<div id="toppanel" style="z-index: 0; position: absolute; top: 0px; left: 303px;"> <h1>Gustr</h1> <table class="tags topbar"> <tbody><tr> <td> <a href="#">Organic</a> </td> <td> <a href="#">Grass Fed</a> </td> <td> <a href="#">Locally Sourced</a> </td> <td> <a href="#">Vegetarian</a> </td> </tr> </tbody></table> <input class="controls" id="pac-input" placeholder="Enter a location" type="text" autocomplete="off"> </div>';

function tagRefresh(url) {
  $.get(url, function(data) {
    $("table.tags").parent().html(data);
    $('td .count').map(function(index, div) {
      var width = ($($(div).parent()).width()/2) - $(div).width() - 5 + 'px';
      $(div).css('margin-left',width);
    });
    $("#simplemodal-container").css('height', 'auto');
    $(window).trigger('resize.simplemodal');
  });
}
function showModal(url) {
  $.get(url, function(data) {
    $.modal(data, {opacity: 50,
            autoPosition: true,
            position: '0 50%',
            onOpen: function(dialog) {
              dialog.overlay.fadeIn('slow', function() {
                dialog.container.slideDown('slow', function() {
                  dialog.data.fadeIn('slow');
                  $('td .count').map(function(index, div) {
                    var width = ($($(div).parent()).width()/2) - $(div).width() - 5 + 'px';
                    $(div).css('margin-left', width);
                    $('body').append(toppanel);
                    readyUp();
                  });
                });
              });
            }});
  });
}

function readyUp() {
  resizeBg();
  if ($('#map-canvas').length > 0) {
    var lati = $('#latlng #lat').text();
    var lngi = $('#latlng #long').text();
    var latlng = new google.maps.LatLng(lati, lngi);
    if ($('span.address').length === 0) {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          lati = position.coords.latitude;
          lngi = position.coords.longitude;
          latlng = new google.maps.LatLng(lati, lngi);
          map.setCenter(latlng);
        });
      }
    } else {
      geocoder.geocode( { 'address': $('span.address').text()}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          map.setZoom(17);
        }
      });
    }
    var mapOptions = { center: latlng, zoom: 13 };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    map.setCenter(latlng);
    var input =/** @type {HTMLInputElement} */( document.getElementById('toppanel'));

    var floater =/** @type {HTMLInputElement} */( document.getElementById('floater'));

    map.controls[google.maps.ControlPosition.TOP].push(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(floater);

    input = document.getElementById('pac-input');
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    autocomplete.setTypes(['establishment']);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: map
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      autocomplete.bindTo('bounds', map);
      autocomplete.setTypes(['establishment']);
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
      marker.setIcon(/** @type {google.maps.Icon} */({
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

      infowindow.setContent('<div><strong><a class="modalHere" onclick="showModal(\'/places/show?name=' + place.name.replace('&','and') +'&address=' + address + '\')" href="#" data-no-turbolink="true">' + place.name + '</a></strong><br>' + address);
      infowindow.open(map, marker);
    });
  } else {
    var html = $('body').html();
    $('body').html(toppanel + '<div id="map-canvas"></div>');
    $.modal(html);
    readyUp();
  }
}
var infowindows = new Array();
var filtermarkers = new Array();
function filter(tag) {
  $(infowindows).each(function(a, w) {
    w.close();
  });
  $(filtermarkers).each(function(a, w) {
    w.setVisible(false);
  });
  $.get('/places?filter=' + tag , function(e) {
    $(e).each(function (j, k) {
      var findex = filtermarkers.length;
      filtermarkers[findex] = new google.maps.Marker({
        map: map
      });
      geocoder.geocode( {'address': k.address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (map.getBounds().contains(results[0].geometry.location)) {
            filtermarkers[findex].setPosition(results[0].geometry.location);
            filtermarkers[findex].setVisible(true);
            var index = infowindows.length;
            infowindows[index] = new google.maps.InfoWindow();
            infowindows[index].setContent('<div><strong><a class="modalHere" onclick="showModal(\'/places/show?name=' + k.name +'&address=' + k.address + '\'); return false;" href="#" data-no-turbolink="true">' + k.name + '</a></strong><br>' + k.address);
            infowindows[index].open(map, filtermarkers[findex]);
            autocomplete.bindTo('bounds', map);
          }
        }
      });
    });
  });
}
$(window).on('resize', function() { resizeBg(); });
$(document).on('ready', function() { readyUp(); } )
$(document).on('page:load', function() { readyUp(); } )
// google.maps.event.addDomListener(window, 'load', readyUp);
