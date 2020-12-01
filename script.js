const displayController = (() => {
  const newGameBtn = document.querySelector('.new-game-btn');
});

// Game board module
const board = (() => {
  let newBoard = new Array(9);
});

// Game control module
const gameController = (() => {
  function reset() {
  displayController.newGameBtn.addEventListener('click', getNames());
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
    setPlayer(num, name);
  }
}

function setPlayer(num, name) {
  token = (num === 1) ? 'X' : 'O';
  window[`player${num}`] = playerFactory(name, token);
}

});

// Player factory
const playerFactory = (name, token) => ({ name, token });





