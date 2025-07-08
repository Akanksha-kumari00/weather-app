const apiKey = '18bba34db396f6d4ce04a5a1f5a27f66';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');

var weatherIcon = document.querySelector('.weather-icon');
var cityElement = document.querySelector('.city');
var tempElement = document.querySelector('.temp');
var humidityElement = document.querySelector('.humidity');
var windElement = document.querySelector('.wind');
var weatherDetails = document.querySelector('.weather-details'); 

weatherDetails.style.display = 'none';

async function checkWeather(city) {
    if (!city) {
        weatherDetails.style.display = 'none';
        return;
    }
    
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    if (data.cod === 200) {
        weatherDetails.style.display = 'block'; 

        cityElement.innerHTML = data.name;
        tempElement.innerHTML = Math.round(data.main.temp) + '°C';
        humidityElement.innerHTML = data.main.humidity + '%';
        windElement.innerHTML = data.wind.speed + ' km/h';

        if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = 'image/cloud.png'
        } else if (data.weather[0].main === 'Clear') {
            weatherIcon.src = 'image/clear.png';
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src =='image/rain.png';
        } else if (data.weather[0].main ==='Drizzle') {
            weatherIcon.src = 'image/dizzling.svg';
        } else if (data.weather[0].main === 'Mist') {
            weatherIcon.src = 'image/mist.png';
        } else if (data.weather[0].main === 'Snow') {
            weatherIcon.src = 'image/snow.png';
        }
    } else {
        weatherDetails.style.display = 'none';
        alert("City not found!");
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});
searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkWeather(searchBox.value);
    }
});