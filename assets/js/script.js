const searchForm= document.getElementById('search-form');
const searchButton= document.getElementById('search-button');


function handleSearchFormSubmit(e) {
    e.preventDefault();
    const searchInputVal= document.getElementById('search-input').value;    
    if(!searchInputVal) {
        console.error("Please enter an input value");
        return;
    }
    // const querystring= `./weather-results.html?q=${searchInputVal}&format=${formatInputVal}`
    // location.assign(querystring);
    geoCode(searchInputVal);
}

function geoCode(city){
    const requestUrl= `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=21af6d40d85137fb259723b0c1ef7906`
    fetch (requestUrl)
        .then(function (response) {
            console.log(response);
            if (!response.ok) {
                throw response.json();
            }
            return response.json()
        })
        .then(function(data){
            console.log(data);
            const lat= data[0].lat;
            const lon= data[0].lon;

            currentWeather(lat, lon);
            fiveDay(lat, lon);
        })

}   

function currentWeather(lat, lon) {
    const requestUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=21af6d40d85137fb259723b0c1ef7906&units=imperial`
    fetch(requestUrl)
    .then(function(response){
        if(!response.ok){
            throw response.json()
        }
        return response.json();
    })
    .then(function(data){
        console.log(data);//current weather data
        bigWeatherCard(data)
    })
}

function fiveDay(lat, lon) {
    const requestUrl= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=21af6d40d85137fb259723b0c1ef7906&units=imperial`
    fetch(requestUrl)
    .then(function(response){
        if(!response.ok){
            throw response.json()
        }
        return response.json();
    })
    .then(function(data){
        // console.log(data);
        createWeatherCard(data.list);
    })
}

function createWeatherCard(array) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.dt_txt.includes('09:00:00')) {
            console.log(element);
            
            const weatherCard = document.createElement('div');
            const date = document.createElement('p');
            const weatherTemp = document.createElement('p');
            const weatherWind = document.createElement('p');
            const weatherH = document.createElement('p');

            date.textContent = element.dt_txt.split(' ')[0];
            weatherTemp.textContent = `Temp: ${element.main.temp}°F`;
            weatherWind.textContent = `Wind: ${element.wind.speed} mph`;
            weatherH.textContent = `Humidity: ${element.main.humidity}%`;

            weatherCard.classList.add('fiveday');

            if (element.weather[0].main === "Clear") {
                const sun = document.createElement('img');
                sun.src = './assets/sun.png';
                sun.classList.add('symbol');
                weatherCard.appendChild(sun);
            } else if (element.weather[0].main === "Clouds") {
                const cloud = document.createElement('img');
                cloud.src = './assets/cloud.jpg';
                cloud.classList.add('symbol');
                weatherCard.appendChild(cloud);
            } else {
                const partlycloudy = document.createElement('img');
                partlycloudy.src = './assets/partlycloudy.webp';
                partlycloudy.classList.add('symbol');
                weatherCard.appendChild(partlycloudy);
            }

            weatherCard.append(date, weatherTemp, weatherWind, weatherH);
            document.querySelector('.weatherDiv').appendChild(weatherCard);
        }
    }
}

function bigWeatherCard(element){
    const weatherCard = document.createElement('div');
    const weatherTemp = document.createElement('p');
    const weatherWind = document.createElement('p');
    const weatherH = document.createElement('p');
    weatherTemp.textContent = `Temp: ${element.main.temp}°F`;
    weatherWind.textContent = `Wind: ${element.wind.speed} mph`;
    weatherH.textContent = `Humidity: ${element.main.humidity}%`;
    weatherCard.classList.add('bigCard-style');


    if (element.weather[0].main === "Clear") {
        const sun = document.createElement('img');
        sun.src = './assets/sun.png';
        sun.classList.add('symbol');
        weatherCard.appendChild(sun);
    } else if (element.weather[0].main === "Clouds") {
        const cloud = document.createElement('img');
        cloud.src = './assets/cloud.jpg';
        cloud.classList.add('symbol');
        weatherCard.appendChild(cloud);
    } else {
        const partlycloudy = document.createElement('img');
        partlycloudy.src = './assets/partlycloudy.webp';
        partlycloudy.classList.add('symbol');
        weatherCard.appendChild(partlycloudy);
    }

    weatherCard.append(weatherTemp, weatherWind, weatherH);
    document.querySelector('.bigCard').appendChild(weatherCard);
}

searchForm.addEventListener('submit', handleSearchFormSubmit);