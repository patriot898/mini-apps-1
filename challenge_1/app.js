//*************MODEL************
//manages data, logic, and rules of application
//'stores' all the moves
//checks to see if there is a winner after every move
//determines what is considered a win


//state items
let state = {};
state.gameBoard = [[null, null, null],
[null, null, null],
[null, null, null]];
state.moveCount = {};
state.moveCount.X = 0;
state.moveCount.O = 0;
state.currentPlayer = 'X';
state.winCount = {};
state.winCount.X = 0;
state.winCount.O = 0;
state.winCount.ties = 0;
state.gameStatus = 'inProgress';

//PICK POSITION
//on click, it changes the value of the selected board position from null to either X or O, depending on whose turn it is
const togglePosition = (rowIndex, columnIndex, player) => {
  state.gameBoard[rowIndex][columnIndex] = player;
  state.moveCount[player] ++
  console.log(state.moveCount[player]);
  checkGameboardWin(player);
  if(player === 'X') {
    state.currentPlayer = 'O';
  } else {
    state.currentPlayer = 'X';
  }
}

const checkRowWin = (rowIndex, player) => {
  let movesInRow = 0;
  for (let column of state.gameBoard[rowIndex]) {
    if (column === player) {
      movesInRow ++;
    }
  }
  return movesInRow === 3;

}

const checkColumnWin = (columnIndex, player) => {
  let movesInColumn = 0;
  for (let row of state.gameBoard) {
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
    for (let i = 0; i < state.gameBoard.length; i++) {
      if (state.gameBoard[i][i] === player) {
        movesInDiagonal++;
      }
    }
  }
  if (diagonalColumnIndex === 2) {
    //check gameboard[0][2], gameboard[1][1], and gameboard[2][0]
    for (let rowIndex = 0; rowIndex < state.gameBoard.length; rowIndex++) {
    let columnIndex = state.gameBoard.length - 1 - rowIndex;
      if(state.gameBoard[rowIndex][columnIndex] === player) {
        movesInDiagonal++;
      }
    }
  }
  if (movesInDiagonal === 3) {

   }
   return movesInDiagonal === 3;
}

const checkGameboardWin = (player) => {

  //checks for any row wins
  //checks for any column wins
  //checks for any diagonal wins
  //if win, calls on winning message of current player to be displayed
  //if after checking wins and seeing there are 9 moves total with no winner, declare tie
  for (let rowIndex = 0; rowIndex < state.gameBoard.length; rowIndex++) {
    if (checkRowWin(rowIndex, player)) {
      alert('Player ' + player + 'won in row: ' + rowIndex + '!!');
      //display winner
      state.winCount[player] ++
      return;
    }
  }

  for (let columnIndex = 0; columnIndex < state.gameBoard[0].length; columnIndex++) {
    if (checkColumnWin(columnIndex, player)) {
      alert('Player ' + player + ' won in column: ' + columnIndex + '!!');
      state.winCount[player] ++
      updateScoreboard(player);
      return;
    }
  }

  if (checkDiagonalWin(0, player)) {
    alert('Player ' + player + ' won in the diagonal at column: 0!!');
    state.winCount[player] ++
    updateScoreboard(player);
    return;
  }

  if (checkDiagonalWin(2, player)) {
    alert('Player ' + player + ' won in the diagonal at column: 2!!');
    state.winCount[player] ++;
    updateScoreboard(player);
    return;
  }

  if (state.moveCount.O + state.moveCount.X === 9) {
    alert("Looks like it's a tie!");
    state.winCount.ties ++
    updateScoreboard('ties');
    return;
  }

}

const resetBoard = () => {
  for(let row of state.gameBoard) {
    for(let j = 0; j < row.length; j++) {
      row[j] = null;
    }
  }
  state.moveCount.X = 0;
  state.moveCount.O = 0;
  state.currentPlayer = 'X';
}


//*************VIEW*************
//handles what to do to visually represent gameboard
const displayMove = (tileRow, tileColumn, player) => {
    let currentTileId = (tileRow.toString() + tileColumn.toString());
    let currentTileElement = document.getElementById(currentTileId);
    currentTileElement.innerText = player;
    //let moveToShow = currentTileElement.getElementsByClassName(player)[0];
    //moveToShow.style.display = 'block';
}

const resetBoardView = () => {
  for (let i = 0; i < state.gameBoard.length; i++) {
    for (let j = 0; j < state.gameBoard[i].length; j++) {
      let currentTile = document.getElementById(i.toString() + j.toString());
      currentTile.innerText = '';
    }
  }
}

const updateScoreboard = (player) => {
  document.getElementById('wins' + player).innerText = state.winCount[player];
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
  if (state.gameBoard[tileRow][tileColumn] === null) {
    togglePosition(tileRow, tileColumn, player);
    displayMove(tileRow, tileColumn, player);
  } else {
    alert("Girl you trippin'");
  }
}

const onResetClick = () => {
  resetBoard();
  resetBoardView();
}

