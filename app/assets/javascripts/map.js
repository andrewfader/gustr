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
      L.marker([lat, lng]).addTo(map)
      .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
      .openPopup();
    }, function() {
    });
  }
}