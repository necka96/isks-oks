let activeGame = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const btn = document.getElementById("btn");
const winingCond = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const status = document.getElementById("status");
const winMessage = () => {
  return "Pobedio je " + currentPlayer + " !!";
};
const drawMessage = () => {
  return "Nereseno je";
};
const currentPlayerTurn = () => {
  return "Na potezu je " + currentPlayer;
};
document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const cellClick = e.target;

    const cellCLickIndex = parseInt(cellClick.getAttribute("data-cell-index"));

    cellPLayed(cellClick, cellCLickIndex);
    ResValid();
  });
});
btn.addEventListener("click", RestartGame);

const cellPLayed = (cellClick, cellCLickIndex) => {
  if (gameState[cellCLickIndex] !== "" || !activeGame) {
    return;
  }
  gameState[cellCLickIndex] = currentPlayer;
  cellClick.innerHTML = currentPlayer;
};
status.innerHTML = currentPlayerTurn();

function ChangePlayer() {
  currentPlayer === "X" ? (currentPlayer = "O") : (currentPlayer = "X");
  status.innerHTML = currentPlayerTurn();
}

function ResValid() {
  let ronudWon = false;

  for (let winCond of winingCond) {
    let a = gameState[winCond[0]];
    let b = gameState[winCond[1]];
    let c = gameState[winCond[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      ronudWon = true;
      break;
    }
  }
  if (ronudWon) {
    status.innerHTML = winMessage();
    gameState = false;
    btn.style.display = "inline";
    return;
  }
  let roundDrow = !gameState.includes("");
  if (roundDrow) {
    status.innerHTML = drawMessage();
    gameState = false;
    btn.style.display = "inline";
    return;
  }
  ChangePlayer();
}

function RestartGame() {
  activeGame = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  status.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerHTML = "";
  });
  btn.style.display = "none";
}
