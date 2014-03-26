$(document).ready(function() {
  if(document.location.toString().indexOf('welcome') != 0) {
    function redir(string) {
      setTimeout(function() {
        alert(document.location.toString().split('/')[2])
        window.location.href = string;
      }, 3000);
    }
    if(document.location.toString().indexOf('1') != 0) {
        redir('/welcome2');
    }
    else if(document.location.toString().indexOf('2') != 0) {
        redir('/welcome');
    }

    else {
        redir('/welcome1');

    }
  }

} );
