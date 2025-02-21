import { createElement, playSound } from "./scripts/helpers";
import { displayNonogram } from "./scripts/displayNonogram";

import clickSound from "./../assets/click-on-cell.mp3";

const levels = ["easy", "medium", "hard"];
const body = document.querySelector("body");

const mainContainer = createElement("div", "main-container", "");
const mainTitle = createElement("h1", "main-title", "Nonograms game");
const levelsWrapper = createElement("div", "levels__wrapper");
const timerWrapper = createElement("div", "timer__wrapper", "00:00");
const playfieldWrapper = createElement("div", "playfield__wrapper", "");

mainContainer.appendChild(mainTitle);
mainContainer.appendChild(levelsWrapper);
mainContainer.appendChild(timerWrapper);
mainContainer.appendChild(playfieldWrapper);
body.appendChild(mainContainer);

let size = 5;
let myTimer;

const setNewGame = (size) => {
  clearTimeout(myTimer);
  timerWrapper.textContent = "00:00";
  displayNonogram(size);
  playfieldActions();
};

const displayLevels = (target, arr) => {
  const elements = arr.map((item) => {
    const level = createElement("button", "levels__btn", `${item}`);
    level.setAttribute("id", `${item}-level`);
    return level;
  });
  elements.forEach((item) => {
    target.appendChild(item);
    item.addEventListener("click", setLevel);
  });
};

const setLevel = (e) => {
  e.preventDefault();
  let value = e.target.id;
  if (value === "hard-level") {
    size = 15;
  } else if (value === "medium-level") {
    size = 10;
  } else {
    size = 5;
  }
  setNewGame(size);
};

const timerRun = () => {
  let min = 0;
  let sec = 0;
  myTimer = setTimeout(function timerFn() {
    timerWrapper.innerHTML = `0${min}:0${sec}`;
    if (sec > 9 && min < 10) {
      timerWrapper.innerHTML = `0${min}:${sec}`;
    }
    if (sec < 10 && min > 9) {
      timerWrapper.innerHTML = `${min}:0${sec}`;
    }
    sec += 1;
    if (sec >= 60) {
      sec = 0;
      min += 1;
    }
    myTimer = setTimeout(timerFn, 1000);
  }, 1000);
};


const playfieldActions = () => {
  const playfield = document.querySelector(".playfield");
  playfield.addEventListener("click", timerRun, { once: true });
  playfield.addEventListener("click", (e) => {
    e.preventDefault();
    playSound(clickSound);
    if (e.target.value === "1") {
      e.target.classList.toggle("right-cell");
    }
  });
};

displayLevels(levelsWrapper, levels);
displayNonogram(size);
playfieldActions();
