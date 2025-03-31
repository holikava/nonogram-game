export let myTimer;

export const timerRun = () => {
  const targetMin = document.querySelector('.timer__min').innerText;
  const targetSec = document.querySelector('.timer__sec').innerText;
  let min = Number(targetMin);
  let sec = Number(targetSec);
  myTimer = setTimeout(function timerFn() {
    if (min < 10) {
      document.querySelector('.timer__min').innerText = `0${min}`;
    } else {
      document.querySelector('.timer__min').innerText = `${min}`;
    }
    if (sec < 10) {
      document.querySelector('.timer__sec').innerText = `0${sec}`;
    } else {
      document.querySelector('.timer__sec').innerText = `${sec}`;
    }

    sec++;
    if (sec >= 60) {
      sec = 0;
      min++;
    }
    myTimer = setTimeout(timerFn, 1000);
  }, 1000);
};