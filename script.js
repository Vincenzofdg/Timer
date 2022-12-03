const hoursData = document.querySelector('#hours-in');
const hour = document.querySelector('#hours-display');
const minutesData = document.querySelector('#minutes-in');
const minute = document.querySelector('#minutes-display');
const secondsData = document.querySelector('#seconds-in');
const second = document.querySelector('#seconds-display');

const btnStart = document.querySelector('#start');
const btnStop = document.querySelector('#clean');

// Alarme Sound Importation
const sound = new Audio();
sound.src = './sound.wav'

function reset() {
  hoursData.value = '';
  minutesData.value = '';
  secondsData.value = '';
  hour.innerText = "0";
  minute.innerText = "0";
  second.innerText = "0";
}

function validation(param) {
  param.addEventListener('change', function (event) {
    let toCheck = event.target.value;
    if (toCheck.length > 2 || Number(toCheck) >= 60) {
      param.value = '';
      reset();
    }
  });
}

function convert() {
  const hourMil = Number(hoursData.value) * 60 * 60 * 1000;
  const minMil = Number(minutesData.value) * 60 * 1000;
  const secMil = Number(secondsData.value) * 1000;

  return hourMil + minMil + secMil + 1000;
}

function timer() {
  if (Number(second.innerText) === 0) {
    if (Number(minute.innerText) === 0) {
      hour.innerText = `${Number(hour.innerText) - 1}`;
      minute.innerText = "60";
    }
    minute.innerText = `${Number(minute.innerText) - 1}`;
    second.innerText = "60";
  };
  second.innerText = `${Number(second.innerText) - 1}`
}

// Running the Programm
// Start
btnStart.addEventListener('click', function () {
  hour.innerText = Number(hoursData.value);
  minute.innerText = Number(minutesData.value);
  second.innerText = Number(secondsData.value);

  const countDown = setInterval(timer, 1000)

  setTimeout(() => {
    clearInterval(countDown);
    sound.play();
    reset()
  }, convert());
})

// Clean
btnStop.addEventListener('click', function () {
  document.location.reload(true);
})

// Deamon Actions
validation(hoursData);
validation(minutesData);
validation(secondsData);

reset();
