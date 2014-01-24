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
}
$(document).ready(function() { storyUp(); } )
$(document).on('page:load', function() { storyUp(); } )
