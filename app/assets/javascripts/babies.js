function bindEvents() {
  $('#image_upload').change(function() {
    $('form#new_image').submit();
  });
  $('.floater').draggable();
}
$(document).ready(function() { bindEvents(); } )
$(document).on('page:load', function() { bindEvents(); } )
