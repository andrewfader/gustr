$(document).bind('page:load', function() { readyUp() });
$(document).ready(function() { readyUp() });
function resizeBg() {
  $('#map-canvas').css('min-height',$(window).height());
}
var map;

var tagRefresh = function tagRefresh(e) {
  e.preventDefault();
  $.get($(e.originalEvent.toElement).attr('href'), function(data, response, xhr) {
    $($(e.originalEvent.toElement).closest("table").parent()).html(data);
    $('td .count').map(function(index, div) {
      width = $(div).parent().width()/2 - $(div).width() - 5 + 'px';
      $(div).css('margin-left',width);
    });
    $('table.tags a').on('click', function(e) { tagRefresh(e) });
    $('.simplemodal-close').on('click', function(e) { $.modal.close(); });
  });

}
var showModal = function showModal(event) {
  event.preventDefault();

  $.get($(event.toElement).attr('href'), function(data) {
    $.modal(data, {opacity: 50,
            autoPosition: true,
            position: '0 50%',
            onOpen: function(dialog) {
              dialog.overlay.fadeIn('slow', function() {
                dialog.container.slideDown('slow', function() {
                  dialog.data.fadeIn('slow');
                  $('td .count').map(function(index, div) {
                    width = $(div).parent().width()/2 - $(div).width() - 5 + 'px';
                    $(div).css('margin-left',width);
                  });
                  $('table.tags a').on('click', function(e) { tagRefresh(e) });
                  $('.simplemodal-close').on('click', function(e) { $.modal.close(); });
                });
              });
            }}
           );
  });
}
function readyUp() {
  if ($('#map-canvas').length > 0) {
    $(window).resize(resizeBg());
    resizeBg();
    var mapOptions = {zoom: 13}

    if(navigator.geolocation) {
      if ($('span.address').length == 0) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          latlng = new google.maps.LatLng(lat, lng);
          if (map) {
            map.setCenter(latlng);
          }
          var mapOptions = {
            center: latlng,
            zoom: 13
          };
        });
      }
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    if ($('span.address')) {
      geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': $('span.address').text()}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          map.setZoom(17);
        }
      });
    }
    if (('#pac-input').length == 0) {
      $('body').append('<input type="text" id="pac-input" class="controls"></input>');
    }
    var input = document.getElementById('pac-input');
    var floater = document.getElementById('floater');

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(floater);

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
      marker.setIcon({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      });
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      infowindow.setContent('<div><strong><a class="modalHere" href="/places/show?name=' + place.name.replace('&','and') +'&address=' + address + '" onClick="showModal(event)">' + place.name + '</a></strong><br>' + address);
      infowindow.open(map, marker);
    });
  }
  else {
    html = $('body').html();
    $('body').html('<input type="text" id="pac-input" class="controls"></input><div id="map-canvas"></div>');
    $.modal(html);
    readyUp();
    $('table.tags a').on('click', function(e) { tagRefresh(e) });
    $('.simplemodal-close').on('click', function(e) { $.modal.close(); });
  }
  if (('#pac-input').length == 0) {
    $('body').append('<input type="text" id="pac-input" class="controls"></input>');
    readyUp();
  }
}

// });
// });
// }, function() {
// });
// }
// $('#biz').click(function(e) {
// e.preventDefault();
// $('.new_biz').modal();
// });
// $('#evt').click(function(e) {
// e.preventDefault();
// $('.new_evt').modal();
// });
// $(window).resize(function() {
// $('#map').css('height',$(window).height() + 'px');
// });
// $('#map').css('height',$(window).height() + 'px');
// $('.searchbox').modal();
// var auth = {
// consumerKey: "rOKiJUCwMm1-WCr2KwndzQ",
// consumerSecret: "K9hMyrIjbk_Hz5wW7RefYx67xC4",
// accessToken: "vb-PDP2wymAvFkMFjiGCaeVs3O8DQfSL",
// accessTokenSecret: "jZBUcBHTlkfTespBg1c4IR1X9eU",
// };

// $('#keyword_name').keypress(function() {
// if(navigator.geolocation) {
// navigator.geolocation.getCurrentPosition(function(position) {
// lat = position.coords.latitude;
// lng = position.coords.longitude;

// var accessor = {
// consumerSecret: auth.consumerSecret,
// tokenSecret: auth.accessTokenSecret
// };

// parameters = [];
// parameters.push(['term', $("#keyword_name").val()]);
// parameters.push(['ll',  lat + ',' + lng]);
// parameters.push(['callback', 'cb']);
// parameters.push(['oauth_consumer_key', auth.consumerKey]);
// parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
// parameters.push(['oauth_token', auth.accessToken]);
// parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

// var message = {
// 'action': 'http://api.yelp.com/v2/search',
// 'method': 'GET',
// 'parameters': parameters
// };

// OAuth.setTimestampAndNonce(message);
// OAuth.SignatureMethod.sign(message, accessor);

// var parameterMap = OAuth.getParameterMap(message.parameters);
// parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
// $.ajax({
// 'url': message.action,
// 'data': parameterMap,
// 'cache': true,
// 'dataType': 'jsonp',
// 'jsonpCallback': 'cb',
// 'success': function(data, textStats, XMLHttpRequest) {
// var newArr = new Array();
// $(data['businesses']).map(function(a,b) {
// newArr[a] = b['name'];
// });
// $('#keyword_name').autocomplete({ source: newArr});
// }
// });
// });
// }
// });
// }

