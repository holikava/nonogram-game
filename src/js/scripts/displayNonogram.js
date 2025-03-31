import { createElement } from "./helpers";
import { Cell } from "./cellClass";

export const displayNonogram = (size) => {
  const game = createNonogram(size);
  const wrapper = document.querySelector('.playfield__wrapper');
  const playfield = document.querySelector(".playfield");
  playfield.innerHTML = "";
  game.map((item) => playfield.appendChild(item.create()));
  wrapper.appendChild(playfield);

  displayClue(Array.from(playfield.childNodes), size);
};

const displayClue = (game, size) => {
  const matrix = make2DArray(game, size);
  matrix.map((row) => addDividingLines(row, "row"));
  const topNums = [];
  for (let i = 0; i < size; i++) {
    const col = matrix.map((row) => row[i]);
    topNums.push(cellCounter(col));
    addDividingLines(col, "column");
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
  const nonogram = new Array(arrLength).fill().map(() => {
    let elem = new Cell();
    return elem;
  });
  return nonogram;
};

const addDividingLines = (arr, indicator) => {
  for (let i = 0; i < arr.length; i++) {
    if (i === 4 || i === 9 || i === 14) {
      if (indicator === "row") {
        arr[i].classList.add("divider-rows");
      }
      if (indicator === "column") {
        arr[i].classList.add("divider-cols");
      }
    }
  }
};
