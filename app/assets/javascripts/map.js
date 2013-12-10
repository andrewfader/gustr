$(document).bind('page:load', function() { readyUp() });
$(document).ready(function() { readyUp() });
function resizeBg() {
  $('#map-canvas').css('min-height',$(window).height());
}
function readyUp() {
  $(window).resize(resizeBg());
  resizeBg();

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 13
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      var input = document.getElementById('pac-input');

      var types = document.getElementById('type-selector');
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', map);

      var infowindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
        map: map
      });

      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
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

        infowindow.setContent('<div><strong><a href="/places/show?name=' + place.name + '">' + place.name + '</a></strong><br>' + address);
        infowindow.open(map, marker);
      });

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      function setupClickListener(id, types) {
        var radioButton = document.getElementById(id);
        google.maps.event.addDomListener(radioButton, 'click', function() {
          autocomplete.setTypes(types);
        });
      }

      setupClickListener('changetype-all', []);
      setupClickListener('changetype-establishment', ['establishment']);
      setupClickListener('changetype-geocode', ['geocode']);
    });
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

