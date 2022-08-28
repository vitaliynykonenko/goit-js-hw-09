import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const libraryFlatpickr = document.querySelector('input#datetime-picker');
const timer = document.querySelector('.timer');
const buttonStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      buttonStart.disabled = true;
    } else { 
      buttonStart.disabled = false;
    };
  },
};

flatpickr(libraryFlatpickr, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};

buttonStart.addEventListener('click', () => { 
  let timerId = null;
  
  function countdownTimer() { 
    const diff = new Date(libraryFlatpickr.value) - new Date();
    if (diff < 0) { 
      clearInterval(timerId);
      return;    
    }

    let timerObject = convertMs(diff);
    days.textContent = addLeadingZero(timerObject.days);
    hours.textContent = addLeadingZero(timerObject.hours);
    minutes.textContent = addLeadingZero(timerObject.minutes);
    seconds.textContent = addLeadingZero(timerObject.seconds);
  
  } 

  timerId = setInterval(countdownTimer, 1000);
  
});
