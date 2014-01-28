function storyUp() {

  $('ul#buttons li').hover(function() {
    $(this).css('background-color','green');
  },
  function() {
    $(this).css('background-color','white');
  });
  $('td.hover').hover(function() {
    $(this).css('background-color','green');
  },
  function() {
    $(this).css('background-color','gray');
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
}
$(document).ready(function() { storyUp(); } )
$(document).on('page:load', function() { storyUp(); } )
