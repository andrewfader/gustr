$(document).bind('page:load', function() { readyUp() });
$(document).ready(function() { readyUp() });

function readyUp() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      var map = L.map('map').setView([lat, lng], 16);

      L.tileLayer('http://{s}.tile.cloudmade.com/babee756d2484307ba907bd611d0a64c/997/256/{z}/{x}/{y}.png', {
        // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker([lat, lng]).addTo(map).bindPopup('You are here!').openPopup();
      $.getJSON('/events.json', function(data, status, xhr) {
        data.map(function(event) {
          L.marker([event["lat"], event["lng"]]).addTo(map).bindPopup(event["name"] + '<br>' + event["description"] + '<br>' + event["biz_name"]).openPopup();
        });
      });
    }, function() {
    });
  }
  $('#biz').click(function(e) {
    e.preventDefault();
    $('.new_biz').modal();
  });
  $('#evt').click(function(e) {
    e.preventDefault();
    $('.new_evt').modal();
  });
  $(window).resize(function() {
    $('#map').css('height',$(window).height() + 'px');
  });
  $('#map').css('height',$(window).height() + 'px');
  $('.searchbox').modal();
  var auth = {
    consumerKey: "rOKiJUCwMm1-WCr2KwndzQ",
    consumerSecret: "K9hMyrIjbk_Hz5wW7RefYx67xC4",
    accessToken: "vb-PDP2wymAvFkMFjiGCaeVs3O8DQfSL",
    accessTokenSecret: "jZBUcBHTlkfTespBg1c4IR1X9eU",
  };

  $('#keyword_name').keypress(function() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;

        var accessor = {
          consumerSecret: auth.consumerSecret,
          tokenSecret: auth.accessTokenSecret
        };

        parameters = [];
        parameters.push(['term', $("#keyword_name").val()]);
        parameters.push(['ll',  lat + ',' + lng]);
        parameters.push(['callback', 'cb']);
        parameters.push(['oauth_consumer_key', auth.consumerKey]);
        parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
        parameters.push(['oauth_token', auth.accessToken]);
        parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

        var message = {
          'action': 'http://api.yelp.com/v2/search',
          'method': 'GET',
          'parameters': parameters
        };

        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);

        var parameterMap = OAuth.getParameterMap(message.parameters);
        parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
        $.ajax({
          'url': message.action,
          'data': parameterMap,
          'cache': true,
          'dataType': 'jsonp',
          'jsonpCallback': 'cb',
          'success': function(data, textStats, XMLHttpRequest) {
            var newArr = new Array();
            $(data['businesses']).map(function(a,b) {
              newArr[a] = b['name'];
            });
            $('#keyword_name').autocomplete({ source: newArr});
          }
        });
      });
    }
  });
}

