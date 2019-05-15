function deleteData(id) {
  const url = '/delete/' + id;
  console.log('In delete function, url = ', url);
  if (confirm('Are you sure about this?')) {
    return fetch(url, {
      method: 'delete'
    })
      .then(response => {
        response.json();
        window.location.href = '/allrecipes';
      })
      .catch(error => console.error('Error:', error));
      }
}

function updateData(id, name, ingredients, directions) {
  console.log(id, name, ingredients, directions);
  document.getElementById('modal-id').setAttribute('value', id);
  document.getElementById('modal-name').setAttribute('value', name);
  document.getElementById('modal-ingredients').innerHTML = ingredients;
  document.getElementById('modal-directions').innerHTML = directions;
}

function openSlideMenu() {
  document.getElementById('side-bar').style.width = '200px';
}

function closeSlideMenu() {
  document.getElementById('side-bar').style.width = '0';
}