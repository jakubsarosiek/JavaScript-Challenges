let gridSize = 3;
let player = "X";
let winnerPlayer = null;
const startingMessage =
  `Let's Play a Game! Player ${player} starts.`.toUpperCase();

function makeDiv(className) {
  const winnerRow = document.createElement("div");
  winnerRow.className = className;
  game.appendChild(winnerRow);
}
function makeButton(className) {
  const button = document.createElement("button");
  button.className = className;
  button.textContent = `Reset`.toUpperCase();
  game.appendChild(button);
}
function makeGame() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement("button");
      cell.classList.add("cell");
      cell.dataset.x = j;
      cell.dataset.y = i;
      grid.appendChild(cell);
    }
  }
}
function checkWinner() {
  if (
    checkRow(0) ||
    checkRow(1) ||
    checkRow(2) ||
    checkCol(0) ||
    checkCol(1) ||
    checkCol(2) ||
    checkDiagonal() ||
    checkDiagonalReverse()
  ) {
    return true;
  }
  return false;
}
function checkRow(rowNumber) {
  let row = [];
  for (let i = 0; i < gridSize; i++) {
    buttonix = document.querySelector(
      `[data-x="${i}"][data-y="${rowNumber}"]`
    ).textContent;
    if (buttonix === "X" || buttonix === "O") {
      row.push(buttonix);
    } else {
      row.push(undefined);
    }
  }
  return allAreEqual(row);
}
function checkCol(colNumber) {
  let row = [];
  for (let i = 0; i < gridSize; i++) {
    buttonix = document.querySelector(
      `[data-x="${colNumber}"][data-y="${i}"]`
    ).textContent;
    if (buttonix === "X" || buttonix === "O") {
      row.push(buttonix);
    } else {
      row.push(undefined);
    }
  }
  return allAreEqual(row);
}
function checkDiagonal() {
  let arr = [[], [], []];
  let row = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      buttonix = document.querySelector(
        `[data-x="${i}"][data-y="${j}"]`
      ).textContent;
      if (buttonix === "X" || buttonix === "O") {
        arr[j].push(buttonix);
      } else {
        arr[j].push(undefined);
      }
    }
  }
  row.push(arr[0][0], arr[1][1], arr[2][2]);

  return allAreEqual(row);
}
function checkDiagonalReverse() {
  let arr = [[], [], []];
  let row = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      buttonix = document.querySelector(
        `[data-x="${i}"][data-y="${j}"]`
      ).textContent;
      if (buttonix === "X" || buttonix === "O") {
        arr[j].push(buttonix);
      } else {
        arr[j].push(undefined);
      }
    }
  }
  row.push(arr[0][2], arr[1][1], arr[2][0]);

  return allAreEqual(row);
}
function allAreEqual(array) {
  const result = array.every((element) => {
    if (element === undefined) {
      return false;
    } else if (element === array[0]) {
      return true;
    }
  });

  return result;
}
function checkRemis() {
  let count = 0;
  const maxCount = gridSize * gridSize;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      buttonix = document.querySelector(
        `[data-x="${i}"][data-y="${j}"]`
      ).textContent;
      if (buttonix === "X" || buttonix === "O") {
        count++;
      }
    }
  }
  if (count === maxCount) {
    return true;
  } else {
    return false;
  }
}
function switchPlayer() {
  if (player === "X") {
    player = "O";
  } else {
    player = "X";
  }
  winnerDiv.textContent = `now player ${player} move`.toUpperCase();
}
function resetGame() {
  let arr = [[], [], []];
  let row = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      document.querySelector(`[data-x="${i}"][data-y="${j}"]`).textContent = "";
    }
  }
  currentPlayer = "X";
  winnerDiv.textContent = startingMessage;
  winnerPlayer = null;
  grid.addEventListener("click", playGame);
}
const playGame = (targetItem) => {
  if (targetItem.target.textContent === "") {
    targetItem.target.textContent = player;
  }

  if (checkWinner()) {
    winnerPlayer = player;
    winnerDiv.textContent = `Player ${winnerPlayer} WINS!!!`.toUpperCase();
    //console.log(`Player ${winnerPlayer} WINS!!! :)`);
    grid.removeEventListener("click", playGame);
    // resetGame();
  } else if (checkRemis()) {
    //console.log(`It's REMIS!!!`);
    winnerDiv.textContent = `It's REMIS!!!`.toUpperCase();
    grid.removeEventListener("click", playGame);
    //resetGame();
  } else {
    switchPlayer();
  }
};

const game = document.querySelector(".game");
makeDiv("grid");
makeDiv("winnerRow");
makeButton("resetBtn");
const grid = document.querySelector(".grid");
makeGame();
const winnerDiv = document.querySelector(".winnerRow");
const resetBtn = document.querySelector(".resetBtn");
winnerDiv.textContent = startingMessage;
grid.addEventListener("click", playGame);
resetBtn.addEventListener("click", resetGame);
