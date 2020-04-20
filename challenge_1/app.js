//*************MODEL************
//manages data, logic, and rules of application
//'stores' all the moves
//checks to see if there is a winner after every move
//determines what is considered a win


let testBoard = [['X', 'X', 'O'],
['O', 'X', 'X'],
['O', 'O', 'O']];

let gameBoard = [[null, null, null],
[null, null, null],
[null, null, null]];

let moveCountX = 0;
let moveCountO = 0;

let currentPlayer = 'X';

//PICK POSITION
//on click, it changes the value of the selected board position from null to either X or O, depending on whose turn it is
const togglePosition = (rowIndex, columnIndex, player) => {
  gameBoard[rowIndex][columnIndex] = player;
  if(player === 'X') {
    moveCountX ++;
    currentPlayer = 'O';
  } else {
    moveCountO ++;
    currentPlayer = 'X';
  }
}

const checkRowWin = (rowIndex, player) => {
  let movesInRow = 0;
  for (let column of gameBoard[rowIndex]) {
    if (column === player) {
      movesInRow ++;
    }
  }
  return movesInRow === 3;

}

const checkColumnWin = (columnIndex, player) => {
  let movesInColumn = 0;
  for (let row of gameBoard) {
    if (row[columnIndex] === player) {
      movesInColumn ++
    }
  }
  if (movesInColumn === 3) {

  }
  return movesInColumn === 3;
}

const checkDiagonalWin = (diagonalColumnIndex, player) => {
  let movesInDiagonal = 0;
  if (diagonalColumnIndex === 0) {
    //check gameboard[0][0], gameboard[1][1], and gameboard[2][2]
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i][i] === player) {
        movesInDiagonal++;
      }
    }
  }
  if (diagonalColumnIndex === 2) {
    //check gameboard[0][2], gameboard[1][1], and gameboard[2][0]
    for (let rowIndex = 0; rowIndex < gameBoard.length; rowIndex++) {
    let columnIndex = gameBoard.length - 1 - rowIndex;
      if(gameBoard[rowIndex][columnIndex] === player) {
        movesInDiagonal++;
      }
    }
  }
  if (movesInDiagonal === 3) {

   }
   return movesInDiagonal === 3;
}

const checkGameboardWin = (player) => {
  for (let rowIndex = 0; rowIndex < gameBoard.length; rowIndex++) {
    if (checkRowWin(rowIndex, player)) {
      console.log('Player', player , 'won in row:', rowIndex + '!!');
      //display winner
      return;
    }
  }

  for (let columnIndex = 0; columnIndex < gameBoard[0].length; columnIndex++) {
    if (checkColumnWin(columnIndex, player)) {
      console.log('Player', player, 'won in column: ', columnIndex + '!!');
      return;
    }
  }

  if (checkDiagonalWin(0, player)) {
    console.log('Player', player, 'won in the diagonal at column: 0!!');
    return;
  }

  if (checkDiagonalWin(2, player)) {
    console.log('Player ', player, ' won in the diagonal at column: 2!!');
    return;
  }

  if (moveCountO + moveCountX === 9) {
    console.log("Looks like it's a tie!");
    return;
  }

  console.log('No winner yet...');
  return;




  //checks for any row wins
  //checks for any column wins
  //checks for any diagonal wins
  //if win, calls on winning message of current player to be displayed
  //if after checking wins and seeing there are 9 moves total
}


//*************VIEW*************
//handles what to do to visually represent gameboard
const displayMove = (tileRow, tileColumn, player) => {

}


//each portion of the gameboard - displays an X or O
//resets the visual display of gameboard
//displays winner or tie when a user wins
//displays whose turn it is


//***********CONTROLLER*********
//actually handles each click, telling which model functions to execute when
//     a specific area on the gameboard is clicked
//

const onGameTileClick = (tileRow, tileColumn, player) => {
  togglePosition(tileRow, tileColumn, player);

}

