function resizeBg() {
  $('#map-canvas').css('height',$(window).height());
  $('#map-canvas').css('width',$(window).width());
  $('body').css('height',$(window).height());
  $('body').css('width',$(window).width());
}
var map;
var geocoder = new google.maps.Geocoder();
var toppanel = '<div id="toppanel" style="z-index: 0; position: absolute; top: 0px; left: 303px;"> <h1>Gustr</h1> <table class="tags topbar"> <tbody><tr> <td> <a href="#">Organic</a> </td> <td> <a href="#">Grass Fed</a> </td> <td> <a href="#">Locally Sourced</a> </td> <td> <a href="#">Vegetarian</a> </td> </tr> </tbody></table> <input class="controls" id="pac-input" placeholder="Enter a location" type="text" autocomplete="off"> </div>';

function tagRefresh(e) {
  e.preventDefault();
  link = $(e.target).attr('href');
  $.get(link, function(data) {
    $(e.target).closest("table").parent().html(data);
    $('td .count').map(function(index, div) {
      var width = ($($(div).parent()).width()/2) - $(div).width() - 5 + 'px';
      $(div).css('margin-left',width);
    });
    $("#simplemodal-container").css('height', 'auto');
    $(window).trigger('resize.simplemodal');
    $('table.tags a').on('click', function(e) {
      e.preventDefault();
      tagRefresh(e);
    });
  });
}
function showModal(event) {
  event.preventDefault();
  $.get($(event.target).attr('href'), function(data) {
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
                  });
                });
              });
            }});
  });
}

function readyUp() {
  var latlng;
  resizeBg();
  if ($('#map-canvas').length > 0) {
    lati = $('#latlng #lat').text();
    lngi = $('#latlng #long').text();
    latlng = new google.maps.LatLng(lati, lngi);
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
    var autocomplete = new google.maps.places.Autocomplete(input);
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

      var address = '';
      if (place.address_components) {
        address = [ (place.address_components[0] && place.address_components[0].short_name || ''), (place.address_components[1] && place.address_components[1].short_name || ''), (place.address_components[2] && place.address_components[2].short_name || '') ].join(' ');
      }

      infowindow.setContent('<div><strong><a onClick="showModal(event)" class="modalHere" href="/places/show?name=' + place.name.replace('&','and') +'&address=' + address + '">' + place.name + '</a></strong><br>' + address);
      infowindow.open(map, marker);
    });
    if(document.location.href.indexOf("filter") != -1) {
      $.get('/places' + document.location.href.split("/")[3], function(e) {
        $(e).each(function (j, k) {
          var marker = new google.maps.Marker({
            map: map
          });
          geocoder.geocode( {'address': k.address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              marker.setVisible(true);
              marker.setPosition(results[0].geometry.location);
              marker.setVisible(true);
              var infowindow = new google.maps.InfoWindow();
              infowindow.setContent('<div><strong><a onClick="showModal(event)" class="modalHere" href="/places/show?name=' + k.name +'&address=' + k.address + '">' + k.name + '</a></strong><br>' + k.address);
              infowindow.open(map, marker);
            }
          });
        });
      });
    }
  } else {
    var html = $('body').html();
    $('body').html(toppanel + '<div id="map-canvas"></div>');
    $.modal(html);
  }
  if ($('#toppanel').length === 0) {
    $('body').append(toppanel);
  }
}
$(window).on('resize', function() { resizeBg(); });
$('table.tags a').on('click', function(e) { tagRefresh(e); });
$(document).on('ready', function() { readyUp(); } )
// $(document).on('page:load', function() { readyUp(); } )
// google.maps.event.addDomListener(window, 'load', readyUp);
