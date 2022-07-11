const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");


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

function showGreeting() {
    let hour = new Date().getHours();
    let timeOfDay = "Night";
    if (hour > 5 && hour <= 12) {
        timeOfDay = "Morning";
    }
    else if (hour > 12 && hour <= 18) {
        timeOfDay = "Day";
    }
    else if (hour > 18 && hour <= 23) {
        timeOfDay = "Evening";
    }
    greeting.textContent = `Good ${timeOfDay}, `;
}

showGreeting();

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