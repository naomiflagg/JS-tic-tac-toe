const displayController = (() => {
  const newGameBtn = document.querySelector('.new-game-btn');
  newGameBtn.addEventListener('click', () => {
    const game = gameController();
    game.newGame(); 
  });

  const squares = document.querySelectorAll('.square');

  function setPlayerMsg(player) {
    const currentPlayer = document.querySelector('.current-player');
    currentPlayer.textContent = player;
  }

  function displayPlayerMsg() {
    const playerMsg = document.querySelector('.player-msg');
    playerMsg.style.display = 'block';
  }

  function addToken(square, token) {
    square.textContent = token;
  }

  return { squares, setPlayerMsg, displayPlayerMsg, addToken };
})();

// Game board module
const board = (() => {   
  function populateArray() {
    let boardArray = [];
    displayController.squares.forEach(square => {
      boardArray.push(square.textContent);
    })
    return boardArray;
  }

  return { populateArray };
})();

// Game control module
const gameController = (() => {
  let currentPlayer;

  function newGame() {
    getNames();
    currentPlayer = player1;
    displayController.setPlayerMsg(currentPlayer.name);
    displayController.displayPlayerMsg();
    playTurn();
  }

  function getNames() {
    let name;
    let num;
    for (num = 1; num < 3; num++) {
      let input = prompt(`Player ${num}, please enter your name.`);
      if (input == null || input == "") {
        name = `Player ${num}`;
      } else {
        name = input;
      }
      createPlayer(num, name);
    }
  }

  function createPlayer(num, name) {
    token = (num === 1) ? 'X' : 'O';
    window[`player${num}`] = playerFactory(name, token);
  }

  function playTurn() {
    if (!gameOver()) {
      playerMove();
    }
  }

  function playerMove() {
    displayController.squares.forEach(square => {
      square.addEventListener('click', () => {
        if (square.textContent === '') {
          displayController.addToken(square, currentPlayer.token);
          switchPlayer();
          displayController.setPlayerMsg(currentPlayer.name);
          playTurn();
        }
      })
    })
  }

  function gameOver() {
    const possibleWins = [
      [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7],
      [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
    ]
    let currentBoard = board.populateArray();
    possibleWins.forEach(array => {
      if (currentBoard[array[0]] === currentBoard[array[1]] === currentBoard[array[2]]) {
        return true;
      }
    })
    return false;
  }

  function switchPlayer() {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
  }

  return {
    newGame,
    currentPlayer
  }
});

// Player factory
const playerFactory = (name, token) => ({ name, token });





