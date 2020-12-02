const displayController = (() => {
  const upNext = document.querySelector('.up-next');
  const gameOverMsg = document.querySelector('.game-over-msg');
  const newGameBtn = document.querySelector('.new-game-btn');
  
  function squares() {
    return document.querySelectorAll('.square')
  }

  function setUpNext(player) {
    const currentPlayer = document.querySelector('.current-player');
    currentPlayer.textContent = player;
  }

  function displayUpNext() {
    upNext.style.display = 'block';
  }

  function addToken(square, token) {
    square.textContent = token;
  }

  function removeUpNext() {
    upNext.style.display = 'none';     
  }

  function gameOverMessage(winner = null) {
    gameOverMsg.textContent = (winner) ? `${winner.name} is the winner!` : "It's a draw!";
    gameOverMsg.style.display = 'block';
    removeUpNext();
  }

  function deactivateSquares() {
    squares().forEach(square => {
      let clone = square.cloneNode(true);
      square.parentNode.replaceChild(clone, square);
    })
  }

  function reset() {
    squares().forEach(square => {
      square.textContent = '';
    })
    gameOverMsg.style.display = 'none';
  }

  return { 
    newGameBtn,
    squares, 
    setUpNext, 
    displayUpNext, 
    addToken, 
    removeUpNext,
    gameOverMessage,
    deactivateSquares,
    reset
  };
})();

// Game board module
const board = (() => {   
  let boardArray = Array(9);
  function populateArray() {
    displayController.squares().forEach(square => {
      let index = square.classList[0];
      boardArray[index] = square.textContent;
    })
    return boardArray;
  }

  const possibleWins = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
  ];

  function full() {
    if (!boardArray.includes("")) {
      return true;
    }
  }

  return { populateArray, possibleWins, full };
})();

// Game control module
const gameController = (() => {
  let currentPlayer;
  displayController.newGameBtn.addEventListener('click', () => {
    displayController.reset();
    getNames();
    currentPlayer = player1;
    displayController.setUpNext(currentPlayer.name);
    displayController.displayUpNext();
    playTurn();
  });

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
    if (winner()) {
      displayController.gameOverMessage(currentPlayer);
      displayController.deactivateSquares();
    } else if (board.full()) {
      displayController.gameOverMessage();
    } else {
      playerMove();
    }
  }

  function playerMove() {
    displayController.squares().forEach(square => {
      square.addEventListener('click', () => {
        if (square.textContent === '') {
          displayController.addToken(square, currentPlayer.token);
          switchPlayer();
          displayController.setUpNext(currentPlayer.name);
          playTurn();
        }
      })
    })
  }

  function winner() {
    let winner;
    let currentBoard = board.populateArray();
    board.possibleWins.forEach(array => {
      let base = currentBoard[array[0]];
      if (base === currentBoard[array[1]]
        && base === currentBoard[array[2]] 
        && base !== "") {
          switchPlayer();
          winner = true;
          return;
      }
    })
    return winner;
  }

  function switchPlayer() {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
  }
})();

// Player factory
const playerFactory = (name, token) => ({ name, token });





