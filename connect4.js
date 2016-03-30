/*
 * ConnectFour actual logic functions
 *
 */

module.exports = {makeBoard:makeBoard,placeToken:placeToken};

function makeBoard() {
  return new Array(6).fill(new Array(7).fill(0)).map(x=>x.slice());
}

function placeToken(player,col,board) {
  // TODO: copy board to not modify orig
  if (col>board.length) return 'Error : Bad position';
  if (player!==1 && player!==2) return 'Error : Only 2 players';
  for (var i=-1; i<board.length-1; i++) {
    if (board[i+1][col] !== 0) break;
  }
  if (i === -1) return 'Error : Column is full';
  if (i === board.length) i-=2;
  board[i][col] = player;
  return {board:board,state:checkState(col,i,player,board)};
}

function checkState(col,row,player,board) {
  var c = col;
  var r = row;
  var count = 0;
  var i;
  if (row<3) {
    // vertical
    for (i=0; i<board.length; i++) {
      if (board[i][c] === player) count++;
      if (count<4 && board[i][c] !== player) count=0;
    }
    if (count>3) return player;
    count = 0;
  }
  // diagonal right down
  for (i=0; i<board.length; i++) {
    c = col-r+i;
    if (board[i][c] === player) count++;
    if (count<4 && board[i][c] !== player) count=0;
  }
  c = col;
  if (count>3) return player;
  count = 0;
  // diagonal left down
  for (i=0; i<board.length; i++) {
    c = col+r-i;
    if (board[i][c] === player) count++;
    if (count<4 && board[i][c] !== player) count=0;
  }
  c = col;
  if (count>3) return player;
  count = 0;
  // horizonal
  for (i=0; i<board[0].length; i++) {
    if (board[r][i] === player) count++;
    if (count<4 && board[r][i] !== player) count = 0;
  }
  return count>3?player:0;
}

