var searchHistory = [];
  var weatherApiRootUrl = 'https://api.openweathermap.org';
  var weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';
  
 
  var searchForm = document.querySelector('#search-form') ;
  var searchInput = document.querySelector('#search-input') ;
  var todayContainer = document.querySelector('#today') ;
  var forecastContainer = document.querySelector('#forecast');
  var searchHistoryContainer = document.querySelector('#search-history');
  
  // Api Key
  var apiKey = `a9854075d238a8c3e83e544ff046d4c4`


  function checkLocalStorage() {
    const lastCity = localStorage.getItem('lastSearch');
    
    if (lastCity) {
      const buttonEl = document.createElement('button');
      buttonEl.textContent = lastCity;
      buttonEl.classList.add('btn');
      buttonEl.addEventListener('click', function() {
        getWeather(lastCity);
      });
      
      document.getElementById('search-history').appendChild(buttonEl);
    }
  }


  function clearHistory() {
    localStorage.removeItem('city');
    localStorage.removeItem('lastSearch');
    
    const searchHistoryEl = document.getElementById('search-history');
    while (searchHistoryEl.firstChild) {
      searchHistoryEl.removeChild(searchHistoryEl.firstChild);
    }
  }



  function saveSearch(cityName) {
    let allSearches = JSON.parse(localStorage.getItem('city')) || [];
    allSearches.push(cityName);
    
    localStorage.setItem('lastSearch', cityName);
    localStorage.setItem('city', JSON.stringify(allSearches));
    
    clearHistory();
    checkLocalStorage();
  }
  

  function renderCurrentWeather(data) {
    const currentWeatherEl = document.getElementById('current-weather');
    
    const content = `
      <h3 id='title'>${data.name}</h3>
      <p>Temp: ${data.main.temp}</p>
      <p>Wind: ${data.wind.speed}</p>
      <p>Humidity: ${data.main.humidity}</p>
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
    `;
    
    currentWeatherEl.innerHTML = content;

  }
  

  function renderFiveDayForecast(data) {
    const fiveDayEl = document.getElementById('five-day');
    fiveDayEl.innerHTML = '';
    
    for (let i = 3; i < data.list.length; i += 8) {
      const card = document.createElement('div');
      card.classList.add('col-sm-2');
      
      const content = `
        <div class="card border-dark">
          <div class="card-body">
            <h5 class="card-title">${data.list[i].dt_txt}</h5>
            <p class="temp">Temp: ${data.list[i].main.temp}</p>
            <p class="wind">Wind: ${data.list[i].wind.speed}</p>
            <p class="humidity">Humidity: ${data.list[i].main.humidity}</p>
            <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/>
          </div>
        </div>
      `;
      
      card.innerHTML = content;
      fiveDayEl.appendChild(card);

    }

  }
  

  function getWeather(cityName) {
    const key = 'YOUR_API_KEY_HERE';
    const currentWeatherEl = document.getElementById('current-weather');
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        saveSearch(cityName);
        renderCurrentWeather(data);
        
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=imperial`);
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        renderFiveDayForecast(data);
      })
      .catch(error => {
        console.log(error);
        currentWeatherEl.textContent = 'City not found';

      });

  }
  

  function init() {
    checkLocalStorage();
    
    const formEl = document.getElementById('search-form');
    formEl.addEventListener('submit',
    )
  }

initSearchHistory();
searchForm.addEventListener('submit', handleSearchFormSubmit);
searchHistoryContainer.addEventListener('click', handleSearchHistoryClick); 
