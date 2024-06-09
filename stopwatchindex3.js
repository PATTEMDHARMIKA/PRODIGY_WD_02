// script.js
let startTime, updatedTime, difference, tInterval;
let running = false;
let lapNumber = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = '00:00:00';
    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    lapsList.innerHTML = '';
    lapNumber = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function recordLap() {
    if (running) {
        lapNumber++;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapNumber}: ${display.innerHTML}`;
        lapsList.appendChild(lapItem);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
