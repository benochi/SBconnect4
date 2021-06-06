/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
/* [ ] [ ] [ ] [ ] [ ] [ ] [ ] Visual representation 
   [ ] [ ] [ ] [ ] [ ] [ ] [ ]   any FOUR in a row, column or diagonal line = WIN
   [ ] [ ] [ ] [ ] [ ] [ ] [ ] 
   [ ] [ ] [ ] [ ] [ ] [ ] [ ]
   [ ] [ ] [ ] [ ] [ ] [ ] [ ] 
   [ ] [ ] [ ] [ ] [ ] [ ] [ ]*/

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])





/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    for (let y = 0; y < HEIGHT; y++) { //iterate for "HEIGHT" number of times.
      board.push(Array.from({ length: WIDTH })); 
    }  
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.getElementById('board');
  // TODO: add comment for this code
  const top = document.createElement("tr");  // creates new Table-Row element - assigned to 'top'
  top.setAttribute("id", "column-top"); //sets attribute id="column-top">
  top.addEventListener("click", handleClick); //event listener waits for a click on the element 'top' and runs function handleClick

  for (let x = 0; x < WIDTH; x++) { 
    const headCell = document.createElement("td"); //iterates and creates a data cell for the columns = WIDTH
    headCell.setAttribute("id", x); //sets the id of every cell to the value of 'x' as it iterates. 
    top.append(headCell); //appends the const headCell to top on each iteration. 
  }
  board.append(top); //appends 'top' to 'board' const. 

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {  //iterates and increments y until = to height
    const row = document.createElement("tr");  //as it iterates creates a Table - ROW
    for (let x = 0; x < WIDTH; x++) { //nested loop iterates and increments x until = WIDTH
      const cell = document.createElement("td"); //creates Table Data Cell element for x until done, then move to next TR
      cell.setAttribute("id", `${y}${x}`); //gives each cell an ID based on x and y values IE [[0-0]. [1-0]] etc. 
      row.append(cell); //appends to the TABLE ROW "row" the cell on each iteration. 
    }
    board.append(row); //appends the row to the board. 
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {  //This caused many headaches. 
  for (let y = HEIGHT - 1; y >= 0; y--) { //iterate and decrement
    if (!board[y][x]) { //if not already taken. 
      return y; 
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');  //give default shape and size to the piece
  piece.classList.add(`player${currPlayer}`); //gives piece.p# id for styling color red/blue 
  piece.style.top = -50 * (y + 2);  //this is the location for the style, it sets the token to be centered in the cell. 

  const location = document.getElementById(`${y}${x}`); //pulls the ID assigned on creation. 
  location.append(piece);  //adds the piece to the location.
}


/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);  //runs findspotforcolumn function which looks for open spots. 
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer; //update in memory board
  placeInTable(y, x);
  

  // check for win
  if (checkForWin()) { 
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Draw!');
  }
  
  // TODO: switch currPlayer 1 <-> 2
  //function changeTurn(currPlayer) 
    currPlayer = currPlayer === 1 ? 2 : 1; //Almost had it!
    const h1 = document.getElementById('h1')
    h1.innerHTML = "Player: " + currPlayer;     
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

  for (let y = 0; y < HEIGHT; y++) { //iterate over the Y axis elements
    for (let x = 0; x < WIDTH; x++) { //iterate over X axis elements
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //checks for 4 horizontal matches
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];  //checks for 4 vertical matches
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //checks diagonal matchs in positive x direction.
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //checks diagonal matches in negative x direction.
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {  //if ANY direction has 4 matches from currPlayer
        return true;  //return true for checkForWin.
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
