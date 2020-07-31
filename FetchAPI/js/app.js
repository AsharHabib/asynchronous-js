const select = document.getElementById('breeds');
const card = document.querySelector('.card');
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
Promise.all([
  fetchData('https://dog.ceo/api/breeds/image/random'),
  fetchData('https://dog.ceo/api/breeds/list')
])
  .then(data => {
    const breedList = data[1].message;
    const randomImage = data[0].message;
    generateOptions(breedList);
    generateImage(randomImage);
  });

function fetchData(url) {
  return fetch(url)
            .then(checkStatus)
            .then(res=> res.json())
            .catch(error => console.log('Looks like problem', error));
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function generateOptions (data) {
  const options = data.map(item => `
      <option value='${item}'>${item}</option>
    `).join('');
    select.innerHTML = options;
}

function generateImage (data) {
  const html = `
  <img src='${data}' alt='doggo'>
  <p>Click to view images of ${select.value}</p>
  `;
  card.innerHTML = html;
}

function fetchBreedImage() {
  const breed = select.value;
  const img = card.querySelector('img');
  const p = card.querySelector('p');
  fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(data => {
      img.src = data.message;
      img.alt = breed;
      p.textContent = `Click to view more ${breed}`;
    });
}


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);
form.addEventListener('submit', postData);

// ------------------------------------------
//  POST DATA
function postData (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const comment = document.getElementById('comment').value;
  fetch('https://jsonplaceholder.typicode.com/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, comment})
  })
    .then(checkStatus)
    .then(response => response.json())
    .then(data=>console.log(data))
}






// ------------------------------------------
