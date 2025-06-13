import { createElement, playSound } from "./scripts/helpers";
import { displayNonogram } from "./scripts/displayNonogram";
import { myTimer, timerRun, resetTimer } from "./scripts/timer";
import clickSound from "./../assets/click-on-cell.mp3";

const levels = ["easy", "medium", "hard"];

const body = document.querySelector("body");
const mainContainer = createElement("div", "main-container", "");
const mainTitle = createElement("h1", "main-title", "Nonograms game");
const levelsWrapper = createElement("div", "levels__wrapper");
const timerWrapper = createElement("div", "timer__wrapper", "");
const timerMin = createElement("span", "timer__min", "00");
const timerSec = createElement("span", "timer__sec", "00");
const timerSeparator = createElement("span", "timer__separator", " : ");
const playfieldWrapper = createElement("div", "playfield__wrapper", "");
const playfield = createElement("div", "playfield easy-level", "");
const btnsWrapper = createElement("div", "btns__wrapper", "");
const saveGameBtn = createElement("button", "btn btn__save-game", "Save game");
const continueGameBtn = createElement(
  "button",
  "btn btn__continue-game",
  "Continue game"
);
const newGameBtn = createElement("button", "btn bt__new-game", "New game");
const showSolutionBtn = createElement(
  "button",
  "btn btn__show-solution",
  "Show solution"
);

btnsWrapper.appendChild(saveGameBtn);
btnsWrapper.appendChild(continueGameBtn);
btnsWrapper.appendChild(showSolutionBtn);
btnsWrapper.appendChild(newGameBtn);

playfieldWrapper.appendChild(playfield);

timerWrapper.appendChild(timerMin);
timerWrapper.appendChild(timerSeparator);
timerWrapper.appendChild(timerSec);

mainContainer.appendChild(mainTitle);
mainContainer.appendChild(levelsWrapper);
mainContainer.appendChild(timerWrapper);
mainContainer.appendChild(playfieldWrapper);
mainContainer.appendChild(btnsWrapper);

body.appendChild(mainContainer);

let size = 5;

const setNewGame = () => {
  clearTimeout(myTimer);
  resetTimer(timerMin, timerSec);
  displayNonogram(size);
  if (showSolutionBtn.innerText === 'Hide solution') {
    showSolutionBtn.innerText = 'Show solution';
  }
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
  const value = e.target.id;
  switch (value) {
    case 'easy-level':
      size = 5
      break;
    case "medium-level":
      size = 10;
      break;
    case "hard-level":
      size = 15;
      break;
    default: return;
  }
  setNewGame();
}

const playfieldActions = () => {
  const playfield = document.querySelector('.playfield');
  playfield.addEventListener("click", timerRun, { once: true });
  playfield.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.closest('.cell')) {
      e.target.classList.toggle("selected");
    }
    playSound(clickSound);
  });
};

const showSolution = () => {
  const btn = document.querySelector(".btn__show-solution");
  const cells = playfield.querySelectorAll(".cell");
  if (btn.innerText === "Show solution") {
    btn.innerText = "Hide solution";
    playfield.classList.add("disable");
    cells.forEach((cell) => {
      if (cell.value === "1") {
        cell.classList.add("right-cell");
      } else {
        cell.classList.add("wrong-cell");
      }
    });
  } else {
    btn.innerText = "Show solution";
    playfield.classList.remove("disable");
    cells.forEach((cell) => {
      cell.classList.remove("right-cell");
      cell.classList.remove("wrong-cell");
    });
  }
};

const saveCurrentGame = () => {
  const gameObj = {};
  gameObj.playfield = playfieldWrapper.innerHTML;
  gameObj.timerMin = document.querySelector(".timer__min").innerText;
  gameObj.timerSec = document.querySelector(".timer__sec").innerText;
  localStorage.setItem('savedGame', JSON.stringify(gameObj));
};

const continueSavedGame = () => {
  if (!localStorage.getItem("savedGame")) {
    return;
  }
  clearTimeout(myTimer);
  const savedData = JSON.parse(localStorage.getItem("savedGame"));
  playfieldWrapper.innerHTML = savedData.playfield;
  timerMin.innerText = savedData.timerMin;
  timerSec.innerText = savedData.timerSec;
  playfieldActions();
};

displayLevels(levelsWrapper, levels);
setNewGame();
playfieldActions();

showSolutionBtn.addEventListener("click", showSolution);
newGameBtn.addEventListener("click", setNewGame);
saveGameBtn.addEventListener("click", saveCurrentGame);
continueGameBtn.addEventListener("click", continueSavedGame);
