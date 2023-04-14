const ROWS = 10;
const COLS = 10;
const MINES = 10;

let board = [];

const gameContainer = document.querySelector('.game-container');
const messageContainer = document.querySelector('.message-container');
const messageText = document.querySelector('.message-text');
const resetButton = document.querySelector('.reset-button');

// Gera o tabuleiro do jogo
function generateBoard() {
  for (let i = 0; i < ROWS; i++) {
    let row = [];
    for (let j = 0; j < COLS; j++) {
      let square = document.createElement('div');
      square.classList.add('square');
      square.setAttribute('data-row', i);
      square.setAttribute('data-col', j);
      square.addEventListener('click', handleClick);
      gameContainer.appendChild(square);
      row.push({ mine: false, revealed: false });
    }
    board.push(row);
  }
}

// Distribui as minas aleatoriamente pelo tabuleiro
function distributeMines() {
  let minesToPlace = MINES;
  while (minesToPlace > 0) {
    let row = Math.floor(Math.random() * ROWS);
    let col = Math.floor(Math.random() * COLS);
    if (!board[row][col].mine) {
      board[row][col].mine = true;
      minesToPlace--;
    }
  }
}

// Conta o número de minas ao redor de uma célula
function countMines(row, col) {
  let numMines = 0;
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i >= 0 && i < ROWS && j >= 0 && j < COLS && board[i][j].mine) {
        numMines++;
      }
    }
  }
  return numMines;
}

// Revela as células vizinhas de uma célula vazia
function revealNeighbors(row, col) {
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i >= 0 && i < ROWS && j >= 0 && j < COLS && !board[i][j].revealed) {
        let square = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
        square.classList.add('revealed');
        board[i][j].revealed = true;
        let numMines = countMines(i, j);
        if (numMines > 0) {
          square.textContent = numMines;
        } else {
          revealNeighbors(i, j);
        }
      }
    }
  }
}

// Verifica se todas as células não-minas foram reveladas
function checkWin() {
    for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
    if (!board[i][j].mine && !board[i][j].revealed) {
    return false;
    }
    }
    }
    return true;
}
    
// Lida com o clique do jogador em uma célula
function handleClick(event) {
    let row = parseInt(event.target.getAttribute('data-row'));
    let col = parseInt(event.target.getAttribute('data-col'));
    if (board[row][col].mine) {
    event.target.classList.add('mine');
    revealMines();
    showMessage('Game over!');
    } else {
    let numMines = countMines(row, col);
    event.target.classList.add('revealed');
    board[row][col].revealed = true;
    if (numMines > 0) {
    event.target.textContent = numMines;
    } else {
    revealNeighbors(row, col);
    }
    if (checkWin()) {
    showMessage('You win!');
    }
    }
    }
    
    // Revela todas as minas no tabuleiro
    function revealMines() {
    for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
    if (board[i][j].mine) {
    let square = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
    square.classList.add('mine');
    }
    }
    }
}
    
    // Mostra uma mensagem na tela
    function showMessage(text) {
    messageText.textContent = text;
    messageContainer.classList.add('show');
    }
    
    // Esconde a mensagem da tela
function hideMessage() {
   messageContainer.classList.remove('show');
}
    
// Reinicia o jogo
function resetGame() {
    board = [];
    gameContainer.innerHTML = '';
    hideMessage();
    generateBoard();
    distributeMines();
}
    
// Adiciona ouvintes de eventos
resetButton.addEventListener('click',()=>{resetGame();});
   
// Inicializa o jogo
generateBoard();
distributeMines();
  