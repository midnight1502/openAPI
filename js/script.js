const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": "live_YJqBvz1G06cr2ZGFPKQo0gt0v1v1nyc7rVCBJyiFrqmjHJrq6pvJjbwW8Ny1k1Nl"
});

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

function catBreedSelect() {
    const selectElement = document.getElementById('cats');
    const selectedBreed = selectElement.value;
    getImagesByBreed(selectedBreed);
    getInfoByBreed(selectedBreed);
    
}

const catBreeds = document.getElementById('breed_selector');
const catImages = document.getElementById('slider');
const catDesc = document.getElementById('breed_info');

const breedSelect = catBreeds.querySelector('form').querySelector('select');
const breedName = catDesc.getElementsByTagName('h2');
const breedOrigin = catDesc.getElementsByTagName('h3');
const breedDesc = catDesc.getElementsByTagName('p');

function initSlider() {
// getting slide elements
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
let slideIndex = 0;

// set events for control buttons
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

// Prev slide logic
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

// Next slide logic
function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

// Slide visibility update
function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}
updateSlider();
}

function getImagesByBreed(id) {

    fetch("https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=" + id, requestOptions)
    .then(response => {
        if (!response.ok) {
        throw new Error('Request failed');
        }
        return response.json(); // Parse the response as JSON
    })
    .then(data => {
        catImages.innerHTML = '';
        const breedImages = data;
        for (i = 0; i < breedImages.length; i++) {
        catImages.appendChild(document.createElement('img'));
        catImages.lastElementChild.setAttribute('src', breedImages[i].url);
        //catImages.lastElementChild.setAttribute('width', '600');
        }
        initSlider();
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
    }

function getInfoByBreed(breed) {

    fetch("https://api.thecatapi.com/v1/breeds", requestOptions)
    .then(response => {
        if (!response.ok) {
        throw new Error('Request failed');
        }
        return response.json(); // Parse the response as JSON
    })
    .then(data => {
        const breedInfo = data.find(item => item.id === breed);;
        catDesc.querySelector('h2').textContent = breedInfo.name;
        catDesc.querySelector('h3').textContent = breedInfo.origin;
        catDesc.querySelector('p').textContent = breedInfo.description;
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
    }
    

fetch("https://api.thecatapi.com/v1/breeds?limit=25", requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return response.json(); // Parse the response as JSON
  })
  .then(data => {
    const breedsList = data;
    for (i = 0; i < breedsList.length; i++) {
      breedSelect.appendChild(document.createElement('option'));
      breedSelect.lastElementChild.setAttribute('value', breedsList[i].id);
      breedSelect.lastElementChild.textContent = breedsList[i].name;
    }
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });