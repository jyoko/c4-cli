#!/usr/bin/env node
/*
 * CLI interface for C4
 *
 * TODO (maybe) : Animate token drop
 *                Save/resume games
 *                Tests & general cleanup (quick&dirty here)
 *                Add interfaces? (network play??)
 *                Vorpal.prompt always-exits?
 */

var vorpal = require('vorpal')();
var c4 = require('./connect4');
var clc = require('cli-color');
var bbg = clc.bgYellow;
var p1 = clc.cyanBright.bold;
var p2 = clc.redBright.bold;
var bl = clc.black.bold;

console.log('Welcome to Connect4! Type start to begin');

var state=0,board,currentPlayer,t;
var sureFlag = false;
function startGame(v) {
  board = c4.makeBoard();
  currentPlayer = 1;
  state = 0;
  v.log('Game started!');
  prettyBoard(v,board);
  v.log('Player 1, type "p(lace) <COL #>" to move');
}
function prettyBoard(v,b) {
  var t = 'O';
  var pref = '      ';
  v.log('COL #: 1 2 3 4 5 6 7');
  v.log(pref+bbg('               '));
  b.forEach(function(c) {
    v.log(pref+bbg(' '+c.map(x=>x===0?bl(t):x===1?p1(t):p2(t)).join(' ')+' '));
  });
  v.log();
}

vorpal
  .command('start', 'Starts new game')
  .action(function(args,callback) {
    if (state === 0 && board!==void 0) {
      this.log('Will lose current game - Are you sure? (y/yes)');
      sureFlag = true;
      return callback();
    }
    startGame(this);
    callback();
  });

vorpal
  .command('yes')
  .alias('y','Y','YES','YE','ye')
  .hidden()
  .action(function(args,callback) {
    if (!sureFlag) return callback();
    sureFlag = false;
    this.log('Starting new game...');
    startGame(this);
    callback();
  });

vorpal
  .command('place <col>', 'Alias: p, Make move on your turn')
  .alias('p','pl','pla','P','PL','PLA')
  .action(function(args,callback) {
    if (state!==0) {
      this.log('Player '+t.state+' won. Enter "start" to play again!');
      return callback();
    }
    t = c4.placeToken(currentPlayer, -1+args.col, board);
    if (typeof t === 'string') {
      this.log(t);
      return callback();
    }
    board = t.board;
    state = t.state;
    prettyBoard(this,board);
    if (state!==0) {
      // end condition
      this.log('Player '+state+' wins!');
      return callback();
    }
    currentPlayer = currentPlayer===1?2:1;
    this.log('Player '+currentPlayer+"'s turn");

    callback();
  });

vorpal
  .command('show','Displays board')
  .alias('s','sh','sho','S','SH','SHO','SHOW')
  .option('-b, --blank', 'Show blank board, ignores active game')
  .action(function(args, cb) {
    this.log(args);
    if (args.options.blank || board === void 0) {
      prettyBoard(this,c4.makeBoard());
      return cb();
    }
    prettyBoard(this,board);
    cb();
  });


vorpal
  .delimiter('C4 >')
  .show();


