function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStartColor = document.querySelector('[data-start]');

const buttonStopColor = document.querySelector('[data-stop]');
let timerId = null;

buttonStartColor.addEventListener('click', () => {
    timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  buttonStartColor.disabled = true;
});

buttonStopColor.addEventListener('click', () => {
    clearInterval(timerId);
    
    buttonStartColor.disabled = false;    
});

