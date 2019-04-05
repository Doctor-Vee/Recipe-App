$(document).ready(function () {
  $('.delete-recipe').on('click', function () {
    const id = $(this).data('id');
    const url = '/delete/' + id;
    if (confirm('Are you sure about this?')) {
      console.log('About to delete' + url);
/* W3Schools' method for the AJAX
      const xhttp = new XMLHttpRequest();
      xhttp.open('DELETE', url);
      xhttp.send();
      window.location.href='/recipes'; 
      */
// Alternate style of the AJAX - Traversy's method from his tutorial
            $.ajax({
              url: url,
              type: 'DELETE',
              success: function(result){
                console.log('Deleting Recipe...');
                window.location.href='/recipes';
              },
              error: function (err){
                console.log('Not successful');
              }
            });
    }
  });
});

function openSlideMenu() {
  document.getElementById('side-bar').style.width = '200px';
}

function closeSlideMenu() {
  document.getElementById('side-bar').style.width = '0';
}