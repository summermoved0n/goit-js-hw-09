const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let intervalId;
let isActive;

refs.startBtn.addEventListener('click', getStartInterval);
refs.stopBtn.addEventListener('click', getStopInterval);

function getStartInterval() {
  refs.startBtn.disabled = false;
  if (isActive) return;
  console.log('start')
  isActive = true;
  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
}

function getStopInterval() {
  if(!isActive) return
  console.log('stop');
  isActive = false;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}