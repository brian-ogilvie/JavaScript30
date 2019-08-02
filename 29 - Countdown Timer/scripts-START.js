const display = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
let timeout;

function timer(seconds) {
  clearInterval(timeout);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeRemaining(seconds);
  displayEndTime(then);

  timeout = setInterval(() => {
    const secondsRemaining = Math.round((then - Date.now()) / 1000);
    if (secondsRemaining < 0) {
      clearInterval(timeout);
      return;
    }
    displayTimeRemaining(secondsRemaining);
  }, 1000);
}

function displayTimeRemaining(secondsRemaining) {
  const minutes = Math.abs(Math.floor(secondsRemaining / 60));
  const remainderSeconds = Math.abs(secondsRemaining % 60);
  const timerDisplay = `${minutes}:${remainderSeconds < 10 ? '0': ''}${remainderSeconds}`;
  display.textContent = timerDisplay;
  document.title = `Timer ${timerDisplay}`;
}

function displayEndTime(then) {
  const end = new Date(then);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  const message = `Be back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0': ''}${minutes}`;
  endTime.textContent = message;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time, 10);
  timer(seconds);
}

function handleSubmit(e) {
  e.preventDefault();
  const seconds = parseInt(this.minutes.value, 10) * 60;
  timer(seconds);
  this.reset();
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', handleSubmit);