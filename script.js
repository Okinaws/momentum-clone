const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const body = document.querySelector("body");
const slideNext = document.querySelector(".slide-next")
const slidePrev = document.querySelector(".slide-prev")
let imgNum = getRandomImgNum();
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const feelsLike = document.querySelector('.feels-like');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');


function showTime() {
    const currentTime = new Date().toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
}

showTime();

function showDate() {
    let currentDate = new Date();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const options = {month: 'long', day: 'numeric'};
    date.textContent = `${days[currentDate.getDay()]}, ${currentDate.toLocaleDateString('en-US', options)}`;
}

function getTimeOfDay () {
    let hour = new Date().getHours();
    let timeOfDay = "Night";
    if (hour > 5 && hour <= 12) {
        timeOfDay = "Morning";
    }
    else if (hour > 12 && hour <= 18) {
        timeOfDay = "Afternoon";
    }
    else if (hour > 18 && hour <= 23) {
        timeOfDay = "Evening";
    }
    return timeOfDay;
}

greeting.textContent = `Good ${getTimeOfDay()}, `;

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}

function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
}

window.addEventListener('load', getLocalStorage)
window.addEventListener('beforeunload', setLocalStorage)

function setBg() {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay().toLocaleLowerCase()}/${imgNum.toString().padStart(2, "0")}.jpg`;
    img.onload = () => {      
        body.style.backgroundImage = `url(${img.src})`;
    };
}

function getRandomImgNum () {
    return Math.floor(Math.random() * 21);
}

function getSlideNext() {
    if (imgNum == 20) {
        imgNum = 1;
    }
    else {
        imgNum = (Number(imgNum) + 1).toString()
    }
    setBg();
}

function getSlidePrev() {
    if (imgNum == 1) {
        imgNum = 20;
    }
    else {
        imgNum = (Number(imgNum) - 1).toString()
    }
    setBg();
}

setBg();

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

async function getWeather() {
    try {  
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=0bbb38bd937af6c3b86e81cc2b0cfe7d&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        feelsLike.textContent = `Feels like: ${Math.floor(data.main.feels_like)}°C`
        wind.textContent = `Wind: ${Math.floor(data.wind.speed)} m/s`
        city.style.textDecoration='';
    } catch (error) {
        city.style.textDecoration='underline wavy red';
    }
}
getWeather()

function setCity(event) {
    if (event.code === 'Enter') {
        getWeather();
        city.blur();
    }
}

city.addEventListener('keypress', setCity);
city.onblur = function() {
    getWeather();
}

async function setQuote() {  
    const quotes = 'json/quotes.json';
    const res = await fetch(quotes);
    const data = await res.json();
    quoteNumber = Math.floor(Math.random() * Object.keys(data).length);
    quote.textContent = `"${data[quoteNumber].text_en}"`;
    author.textContent = data[quoteNumber].author;
}

setQuote();

changeQuote.addEventListener('click', setQuote);