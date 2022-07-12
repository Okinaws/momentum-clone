const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const body = document.querySelector("body");
const slideNext = document.querySelector(".slide-next")
const slidePrev = document.querySelector(".slide-prev")
let imgNum = getRandomImgNum();


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