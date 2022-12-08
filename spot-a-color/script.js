const game = document.querySelector(".game");
const starSize = 3;
let gridSize = starSize;
let randomCell = { x: 0, y: 0 };
let colors = { oddColor: "rgb(255,0,0)", color: "rgb(0,0,0)" };
let score = 0;
let highscore = 0;
let wonMessage = `you won, congratulations!!`.toUpperCase();

function makeDiv(className, whereElement) {
  const divElement = document.createElement("div");
  divElement.className = className;
  whereElement.appendChild(divElement);
}
function makeGame(gridSize, whereElement) {
  randomizeCell(gridSize);
  randomizeColors(10);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement("button");
      cell.classList.add("cell");
      cell.dataset.x = j;
      cell.dataset.y = i;
      colorGame(cell, randomCell);
      whereElement.appendChild(cell);
      whereElement.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
      whereElement.style.gridTemplateRows = `repeat(${gridSize},1fr)`;
    }
  }
}
function removeGame() {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
}
function colorGame(cell, randomCell) {
  if (cell.dataset.x == randomCell.x && cell.dataset.y == randomCell.y) {
    cell.style.backgroundColor = colors.oddColor;
  } else {
    cell.style.backgroundColor = colors.color;
  }
}
function randomizeColors(diff) {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  let c = `rgb(${r}, ${g}, ${b})`;
  (r += diff) >= 255 ? (r = 255) : r;
  (g += diff) >= 255 ? (g = 255) : g;
  (b += diff) >= 255 ? (b = 255) : b;
  let oc = `rgb(${r}, ${g}, ${b})`;

  colors.color = c;
  colors.oddColor = oc;
}
function randomizeCell(gridSize) {
  let x = Math.floor(Math.random() * gridSize);
  let y = Math.floor(Math.random() * gridSize);
  randomCell.x = x;
  randomCell.y = y;
}
const playGame = (targetItem) => {
  if (grid.textContent === wonMessage) {
    grid.style.removeProperty("justify-Content");
    grid.style.removeProperty("align-Items");
  }
  if (
    targetItem.target.dataset.x == randomCell.x &&
    targetItem.target.dataset.y == randomCell.y
  ) {
    score++;
    scoreDiv.textContent = `SCORE: ${score}`;
    removeGame();
    gridSize++;
    makeGame(gridSize, grid);
    if (score === 25) {
      if (score > highscore) {
        highscore = score;
      }
      score = 0;
      scoreDiv.textContent = `SCORE: ${score}`;
      highscoreDiv.textContent = `HIGHSCORE: ${highscore}`;
      removeGame();
      grid.textContent = wonMessage;
      grid.style.justifyContent = "center";
      grid.style.alignItems = "center";
      grid.style.removeProperty("grid-Template-Columns");
      grid.style.removeProperty("grid-Template-Rows");
    }
  } else {
    if (score > highscore) {
      highscore = score;
    }
    score = 0;
    scoreDiv.textContent = `SCORE: ${score}`;
    highscoreDiv.textContent = `HIGHSCORE: ${highscore}`;
    removeGame();
    gridSize = starSize;
    makeGame(gridSize, grid);
  }
};

makeDiv("textBox", game);
const textBox = document.querySelector(".textBox");
makeDiv("title", textBox);
makeDiv("scores", textBox);
const scores = document.querySelector(".scores");
makeDiv("score", scores);
makeDiv("highscore", scores);
makeDiv("grid", game);
const grid = document.querySelector(".grid");
const title = document.querySelector(".title");
const scoreDiv = document.querySelector(".score");
const highscoreDiv = document.querySelector(".highscore");
title.textContent = `Spot a slightly different color`.toUpperCase();
scoreDiv.textContent = `SCORE: ${score}`;
highscoreDiv.textContent = `HIGHSCORE: ${highscore}`;

makeGame(gridSize, grid);

grid.addEventListener("click", playGame);
