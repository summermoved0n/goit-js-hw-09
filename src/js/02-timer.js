import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';

refs = {
  textInput: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
let timerInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future!');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.textInput, options);

refs.startBtn.addEventListener('click', () => {
  refs.textInput.disabled = true;
  const selectedDate = flatpickr.parseDate(refs.textInput.value, 'Y-m-d H:i');
  refs.startBtn.disabled = true;
  updateTimer(selectedDate);
  timerInterval = setInterval(() => updateTimer(selectedDate), 1000);
});

function updateTimer(endTime) {
  const currentTime = new Date();
  const diff = endTime - currentTime;

  if (diff <= 0) {
    clearInterval(timerInterval);
    Notiflix.Notify.info("Time's up!");
    refs.startBtn.disabled = true;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(diff);

  refs.daysValue.textContent = addLeadingZero(days);
  refs.hoursValue.textContent = addLeadingZero(hours);
  refs.minutesValue.textContent = addLeadingZero(minutes);
  refs.secondsValue.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
