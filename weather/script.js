const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday','Tuesday','Wednesday0','Thursday','Friday', 'Saturday']
const months = ['Jan','Feb','Mar','Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const API_KEY = '3da24c94720e43c58ee38a9edd5d246d';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'
   
    timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes+ ' ' + `<span id="am-pm">"${ampm}"</span>`

    dateEl.innerHTML = days[day] + ',' + date+ ' ' + months[month]


},1000);


getWeatherData ()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        

        let {latitude, longitude} = success.coords;

        fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData (data);

        })

    })
}

function showWeatherData (data){
    let { humidity, pressure, sunrise, sunset, wind_speed} = data.current;


    currentWeatherItemsEl.innerHTML =
    `<div class="weather-item">
       <div>Humidity</div>
       <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
    </div>
    
    
    `;
    let otherDayForecast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){

        }else{
            otherDayForecast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather- icon" class="w-icon">
            
                <div class="temp">Night - 25.6&#176; c</div>
                <div class="temp">Day - 35.6&#176; c</div>
            </div>
            `
        }
     })
    
   
}