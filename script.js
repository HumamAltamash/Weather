const cityName = document.getElementById('city-name');
const form = document.getElementById('form');
const cityDiv = document.getElementById('city-div');
const weatherDiv = document.getElementById('weather-div');
const weatherIcon = document.getElementById('weather-icon');
const temp = document.getElementById('temp');
const min = document.getElementById('min');
const max = document.getElementById('max');
const loading = document.getElementById('loading');
const content = document.getElementById('content');
const innerContainer = document.getElementById('inner-container');

const apiKey = '0c4681f9fe20c3f85b8997d1eedb0e54';

innerContainer.style.display='none';

form.addEventListener('submit', (event) => {
    loading.style.display='block'
    content.style.display='none'
    innerContainer.style.display='flex';
    event.preventDefault();
    // console.log(cityName.value)
    const weatherData = fetchWeater();
    weatherData.then((data) => {
        console.log(data.name)
        cityDiv.innerHTML = `${data.name}, ${data.sys.country}`;
        weatherDiv.innerHTML = data.weather[0].main;
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temp.innerHTML = `${(data.main.temp-273).toFixed(1)}°C`;
        min.innerHTML = `Min: ${(data.main.temp_min-273).toFixed(1)}°C`;
        max.innerHTML = `Max: ${(data.main.temp_max-273).toFixed(1)}°C`;
        loading.style.display='none'
        content.style.display='flex'
    })

    cityName.value = ''
    
});

const fetchWeater = async function () {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}`)
    const responseJSON = await response.json();
    return responseJSON;
}

