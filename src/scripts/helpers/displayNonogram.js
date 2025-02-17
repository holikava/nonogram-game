import { createElement } from "./createElement";
import { Cell } from "./cellClass";

export const displayNonogram = (size) => {
  const game = createNonogram(size);
  const wrapper = document.querySelector(".playfield__wrapper");
  wrapper.innerHTML = "";
  const playfield = createElement("div", "playfield", "");
  if (size === 10) {
    playfield.classList.add("medium-level");
  }
  if (size === 15) {
    playfield.classList.add("hard-level");
  }
  game.map((item) => playfield.appendChild(item.create()));
  wrapper.appendChild(playfield);

  displayClue(Array.from(playfield.childNodes), size);
};

const displayClue = (game, size) => {
  const matrix = make2DArray(game, size);
  const topNums = [];
  for (let i = 0; i < size; i++) {
    const col = matrix.map((row) => row[i]);
    topNums.push(cellCounter(col));
  }

  topNums.forEach((nums, index) => {
    createClueElems(matrix[0][index], nums, "clue__wrapper clue_top");
  });

  const sideNums = matrix.map((row) => cellCounter(row));
  sideNums.forEach((nums, index) => {
    createClueElems(matrix[index][0], nums, "clue__wrapper clue_side");
  });
};

const createClueElems = (target, arr, style) => {
  const clueWrapper = createElement("div", style, "");
  arr.map((item) => {
    const elem = createElement("span", "clue__value", `${item}`);
    clueWrapper.appendChild(elem);
  });
  target.appendChild(clueWrapper);
  target.classList.add("clue-target");
};

const cellCounter = (arr) => {
  const values = arr.map((item) => item.value);
  const result = [];
  let count = 0;
  for (let i = 0; i < values.length; i++) {
    if (values[i] === "1") {
      count++;
    }
    if (values[i] === "1" && values[i + 1] !== "1") {
      result.push(count);
      count = 0;
    }
  }
  return result;
};

const make2DArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const createNonogram = (size) => {
  let arrLength = Math.pow(size, 2);
  const nonogram = new Array(arrLength).fill().map((item) => {
    let elem = new Cell();
    return elem;
  });
  return nonogram;
};
