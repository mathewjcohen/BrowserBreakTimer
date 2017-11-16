let countdown;
const timerDisplay = document.querySelector('.display_time-left');
const endingTime = document.querySelector('.display_end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsRemaining = Math.round((then - Date.now()) / 1000);
    if(secondsRemaining < 0){
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsRemaining);
  }, 1000);
}

function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  const display = `${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp){
  const endTime = new Date(timestamp);
  const hour = endTime.getHours();
  const minutes = endTime.getMinutes();
  endingTime.textContent = `RETURN BY ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(){
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function clearTimer(){
  timer(0);
  timerDisplay.textContent = '';
  endingTime.textContent = '';
  document.title = 'Browser Break Timer';
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.timerForm.addEventListener('submit', function(e){
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});

document.getElementById('clear').addEventListener('click', clearTimer);