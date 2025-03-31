import { createElement, playSound } from "./scripts/helpers";
import { displayNonogram } from "./scripts/displayNonogram";
import { myTimer, timerRun } from "./scripts/timer";
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
const saveGameBtn = createElement("button", "btn btn_save-game", "Save game");
const continueGameBtn = createElement(
  "button",
  "btn btn_continue-game",
  "Continue game"
);
const newGameBtn = createElement("button", "btn btn_new-game", "New game");
const showSolutionBtn = createElement(
  "button",
  "btn btn_show-solution",
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
  timerMin.innerText = "00";
  timerSec.innerText = "00";
  displayNonogram(size);
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
  setPlayfieldSize();
  setNewGame();
};

const setPlayfieldSize = () => {
  if (size === 15) {
    playfield.classList = "playfield hard-level";
  } else if (size === 10) {
    playfield.classList = "playfield medium-level";
  } else {
    playfield.classList = "playfield easy-level";
  }
};

const playfieldActions = () => {
  playfield.addEventListener("click", timerRun, { once: true });
  playfield.addEventListener("click", (e) => {
    e.preventDefault();
    playSound(clickSound);
    console.log(e.target)
    if (e.target.closest('.cell')) {
      e.target.classList.toggle("selected");
    }
  });
};

const showSolution = () => {
  const btn = document.querySelector(".btn_show-solution");
  const cells = playfield.querySelectorAll(".cell");
  if (btn.innerText === "Show solution") {
    btn.innerText = "Hide solution";
    playfield.classList.add("disable");
    cells.forEach((cell) => {
      console.log(cell)
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
  const data = JSON.stringify(playfieldWrapper.innerHTML);
  localStorage.setItem("savedGame", data);
  localStorage.setItem("gameSize", size);
  localStorage.setItem(
    "timerMin",
    document.querySelector(".timer__min").innerText
  );
  localStorage.setItem(
    "timerSec",
    document.querySelector(".timer__sec").innerText
  );
};

const continueSavedGame = () => {
  clearTimeout(myTimer);
  const savedData = JSON.parse(localStorage.getItem("savedGame"));
  playfieldWrapper.innerHTML = savedData;
  size = localStorage.getItem("gameSize");
  setPlayfieldSize();
  timerMin.innerText = localStorage.getItem("timerMin");
  timerSec.innerText = localStorage.getItem("timerSec");
  playfield.addEventListener("click", timerRun, { once: true });
};

displayLevels(levelsWrapper, levels);
displayNonogram(size);
playfieldActions();

showSolutionBtn.addEventListener("click", showSolution);
newGameBtn.addEventListener("click", setNewGame);
saveGameBtn.addEventListener("click", saveCurrentGame);
continueGameBtn.addEventListener("click", continueSavedGame);
