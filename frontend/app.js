// Get references to the HTML elements
const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const duration = 25 * 60; // 25 minutes in seconds

let timeRemaining = duration;
let timerInterval;

// Function to update the timer display
function updateTimer() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    // Format the time to always show two digits
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;

    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        // Do not use alert(), just redirect
        window.location.href = 'complete.html';
    } else {
        timeRemaining--;
    }
}

// Function to start the timer
function startTimer() {
    // Hide the start button after it's clicked
    startButton.style.display = 'none';
    // Run updateTimer every second
    timerInterval = setInterval(updateTimer, 1000);
}

// Event listener for the start button
if (startButton) {
    startButton.addEventListener('click', startTimer);
}

// Initial display of the timer
updateTimer();
