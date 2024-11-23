let startTime, updatedTime, difference, tInterval, running = false;
let lapTimes = [];

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function startPause() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        startPauseBtn.innerHTML = "Pause";
        running = true;
        lapBtn.disabled = false;
        resetBtn.disabled = true;
    } else {
        clearInterval(tInterval);
        running = false;
        startPauseBtn.innerHTML = "Start";
        resetBtn.disabled = false;
        lapBtn.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = "00:00:00.000";
    startPauseBtn.innerHTML = "Start";
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapTimes = [];
    laps.innerHTML = '';
}

function lap() {
    const lapTime = display.innerHTML;
    lapTimes.push(lapTime);
    const li = document.createElement('li');
    li.innerHTML = lapTime;
    laps.appendChild(li);
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));

    display.innerHTML = 
        (hours > 9 ? hours : "0" + hours) + ":" + 
        (minutes > 9 ? minutes : "0" + minutes) + ":" + 
        (seconds > 9 ? seconds : "0" + seconds) + "." + 
        (milliseconds > 99 ? milliseconds : milliseconds > 9 ? "0" + milliseconds : "00" + milliseconds);
}
