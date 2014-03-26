function gusto() {

  if(document.location.toString().indexOf('welcome') != -1) {
    function redir(string) {
      setTimeout(function() {
        var url = 'http://' + document.location.toString().split('/')[2] + '/' + string;
        Turbolinks.visit(url);
      }, 3000);
    }
    if(document.location.toString().indexOf('1') != -1) {
        redir('welcome2');
    }
    else if(document.location.toString().indexOf('2') != -1) {
        redir('welcome');
    }

    else {
        redir('welcome1');

    }
  }

}
$(document).ready(function() { gusto(); } );
$(document).on('page:load', function() { gusto(); });
