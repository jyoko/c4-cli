# Connect4 CLI

Really simple Connect4 game you can play in the terminal.

![Merged screenshots of c4-cli](https://raw.githubusercontent.com/jyoko/c4-cli/master/screenshots.png)

You do have to `npm install` since I haven't packed it up nicely.

Game has built-in help, but as you can see it's pretty straightforward. Run `game.js`, type `start` to begin a game, and `place #` to drop in a row.

You can also check the board (say if you check the help?) with `show`, or type `help` to see that any time.

As far as the code goes:

`connect4.js` has the game logic, only exposes two functions (exported on an object): `makeBoard` and `placeToken`. While you can probably guess what those do, `makeBoard` is hardcoded at 7x6 but easy to extend, `placeToken` takes a column/row/player # (1 or 2)/board and returns an object with the new board and current state, 0 being in-progress and 1/2 if someone has won.

`game.js` runs the client, using [Vorpal](https://vorpal.js.org) for the interactive CLI and [cli-color](https://github.com/medikoo/cli-color) for the "pretty" board display. Should be easy to read (only ~100 lines, mostly Vorpal stuff), the start-new-game-in-middle-of-old-one hidden `yes` command is a quick hack because the `vorpal.prompt` wasn't working as-expected from the documentation; didn't take the time to track down why.

If I'm inspired to fiddle with this somemore (mostly as an exercise in JS CLI), you can expect me to hit the TODOs:

- [ ] Determine if Vorpal prompt thing is a bug/version mismatch/documentation error
- [ ] Animate token drop
- [ ] Add tests & code clean up
- [ ] Save/resume games
- [ ] Extra interfaces (network, HTML, WebGL, whatever - totally works via shared tmux if you must)
