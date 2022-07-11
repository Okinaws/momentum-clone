const time = document.querySelector(".time");
const date = document.querySelector(".date");


function showTime() {
    const currentTime = new Date().toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
}

showTime();

function showDate() {
    let currentDate = new Date();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const options = {month: 'long', day: 'numeric'};
    date.textContent = `${days[currentDate.getDay()]}, ${currentDate.toLocaleDateString('en-US', options)}`;
}

showDate();