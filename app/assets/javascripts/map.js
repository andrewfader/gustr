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
  $('#keyword_name').keypress(function() {
    $('#keyword_name').autocomplete({ source: [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ] });
  });
}
