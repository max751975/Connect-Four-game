/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const HEIGHT = 6;
const WIDTH = 7;

const winner = document.getElementById('winner');
const player = document.getElementById('current-player');

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
player.innerHTML = `Current player: Player ${currPlayer}`;

let gameOver = false;

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

// TODO: set "board" to empty HEIGHT x WIDTH matrix array
function makeBoard() {
  for (let y = 0; y < HEIGHT; y++){
    board.push(Array.from({length:WIDTH}));
  }
  
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  // creates heading table row and makes it clickable
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // creares the body of the game : inner loop cerates row of [WIDTH] cells, sets attribute "y-x" for each cell, outer loop appends [HEIGHT] rows to the table
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
 
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    // TODO: write the real version of this, rather than always returning 0
  for (y = HEIGHT - 1; y >= 0; y--){
    if (!board[y][x]){
      return y;
    }
  }
    return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  // piece.style.top = -50 * (y + 2);
  
  const place = document.getElementById(`${y}-${x}`);
  place.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  // alert(`Player ${currPlayer} wins!!!`)
  winner.innerHTML = `Winner: Player ${currPlayer}`;
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  
  if(gameOver) return;
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    gameOver = true;
    return endGame(`Player ${currPlayer} won!`);
  }

    
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  checkForTie();
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 1){
    currPlayer = 2;
  } else {
    currPlayer = 1;
  }
  player.innerHTML = `Current player: Player ${currPlayer}`;
}

// checkForTie: check if all cells are filled
function checkForTie(){
  for (let x = 0; x < WIDTH; x++){
  for (let y = 0; y < HEIGHT; y++){
    if (!board[y][x]){
      return;
    }
  }
}
// alert('Tie');
winner.innerText = 'Tie!';
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
