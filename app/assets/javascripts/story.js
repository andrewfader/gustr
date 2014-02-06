function storyUp() {

  $('ul#linkbuttons li, ul#buttons input').hover(function() {
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

  // completer = new GmapsCompleter({
    // inputField: '#story_place_name',
    // mapElem: 'null'
  // });

  // completer.autoCompleteInit({
    // country: "USA",
    // region: "US"
  // });
  $('.button').button();
  $('.button.back').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    window.history.back();
  });
}
$(document).ready(function() { storyUp(); } )
$(document).on('page:load', function() { storyUp(); } )
