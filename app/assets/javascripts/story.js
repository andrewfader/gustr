function tagRefresh(url) {
  $.get(url, function(data) {
    $("html").html(data);
  });
}
function storyUp() {
  $('ul#buttons input').hover(function() {
    $(this).css('background',"linear-gradient(#cde460,#78a139)");
  },
  function() {
    $(this).css('background','#009900');
  });
  $('ul#linkbuttons li').hover(function() {
    $(this).css('background-color','#009900');
  },
  function() {
    $(this).css('background-color','gray');
  });
  $('td.hover').hover(function() {
    $(this).css('background-color','#009900');
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
