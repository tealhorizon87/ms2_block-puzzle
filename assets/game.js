// variables and constants used to draw the grids
const gameBox = document.getElementById('gameBox');
const previewBox = document.getElementById('previewBox');
const gridSquare = document.createElement('div');
var matrix = [];
var previewMatrix = [];
var takenMatrix = [];

// function to draw the various grids on the page
function makeGrid(className, gridSize, children, parent) {
  gridSquare.classList.add(className);
  for (let i = 0; i < gridSize; i++) {
    children.push(gridSquare);
  };
  children.forEach(child => {
    parent.appendChild(child.cloneNode(true));
  });
  return children;
}
// Event listener to draw the grids when the page has loaded
window.addEventListener('DOMContentLoaded',
  makeGrid('square', 200, matrix, gameBox),
  makeGrid('square', 16, previewMatrix, previewBox),
  makeGrid('taken', 10, takenMatrix, gameBox)
);

// Button constants
const modalButtons = [
  rulesButton,
  scoreboardButton,
  contactButton,
  menuButton,
  rulesButtonSmall,
  scoreboardButtonSmall,
  contactButtonSmall,
];
const startButtons = [
  startButton,
  startButtonSmall,
  playAgainButton
];
for (button in modalButtons) {
  button = document.getElementById('button');
};
for (button in startButtons) {
  button = document.getElementById('button');
};
const closeButton = document.getElementById('closeButton');
// Modal constants
const modals = [
  rulesModal,
  contactModal,
  menuModal,
  scoreboardModal
];
const eventModals =[
  rulesModal,
  scoreboardModal,
  contactModal,
  menuModal,
  rulesModal,
  scoreboardModal,
  contactModal
];
for (modal in modals) {
  modal = document.getElementById('modal');
};

// button event listeners
for (let i = 0; i < modalButtons.length; i++) {
  modalButtons[i].addEventListener('click', function() {
    eventModals[i].style.display = 'block';
  })
};
for (let i = 0; i < modals.length; i++) {
  modals[i].addEventListener('click', function() {
    modals[i].style.display = 'none';
  })
};
for (let i = 0; i < startButtons.length; i++) {
  startButtons[i].addEventListener('click', startGame)
};
closeButton.addEventListener('click', function() {
  rulesModal.style.display = 'none';
})
// movement event listeners
window.addEventListener('keydown', function(event) {
  switch(event.code) {
    case 'KeyW':
    case 'ArrowUp':
      rotate()
      break;
    case 'KeyS':
    case 'ArrowDown':
      moveDownFaster()
      break;
    case 'KeyA':
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'KeyD':
    case 'ArrowRight':
      moveRight()
      break;
  }
});

// constants containing the arrays for the blocks and their rotations
const gridWidth = 10;
const previewGridWidth = 4;
const jBlock = [
  [1, 2, gridWidth+1, gridWidth*2+1],
  [gridWidth, gridWidth+1, gridWidth+2, gridWidth*2+2],
  [1, gridWidth+1, gridWidth*2, gridWidth*2+1],
  [0, gridWidth, gridWidth+1, gridWidth+2]
];
const lBlock = [
  [0, 1, gridWidth+1, gridWidth*2+1],
  [2, gridWidth, gridWidth+1, gridWidth+2],
  [1, gridWidth+1, gridWidth*2+1, gridWidth*2+2],
  [gridWidth, gridWidth+1, gridWidth+2, gridWidth*2]
];
const zBlock = [
  [0, 1, gridWidth+1, gridWidth+2],
  [1, gridWidth, gridWidth+1, gridWidth*2],
  [0, 1, gridWidth+1, gridWidth+2],
  [1, gridWidth, gridWidth+1, gridWidth*2]
];
const tBlock = [
  [0, 1, 2, gridWidth+1],
  [1, gridWidth, gridWidth+1, gridWidth*2+1],
  [1, gridWidth, gridWidth+1, gridWidth+2],
  [1, gridWidth+1, gridWidth+2, gridWidth*2+1]
];
const oBlock = [
  [0, 1, gridWidth, gridWidth+1],
  [1, 2, gridWidth+1, gridWidth+2],
  [0, 1, gridWidth, gridWidth+1],
  [1, 2, gridWidth+1, gridWidth+2]
];
const iBlock = [
  [1, gridWidth+1, gridWidth*2+1, gridWidth*3+1],
  [gridWidth, gridWidth+1, gridWidth+2, gridWidth+3],
  [1, gridWidth+1, gridWidth*2+1, gridWidth*3+1],
  [gridWidth, gridWidth+1, gridWidth+2, gridWidth+3]
];
const blocks = [jBlock, lBlock, zBlock, tBlock, oBlock, iBlock];
const previewBlocks = [
  [previewGridWidth+1, previewGridWidth+2, previewGridWidth*2+1, previewGridWidth*3+1],
  [previewGridWidth+1, previewGridWidth+2, previewGridWidth*2+2, previewGridWidth*3+2],
  [previewGridWidth+1, previewGridWidth+2, previewGridWidth*2+2, previewGridWidth*2+3],
  [previewGridWidth+1, previewGridWidth+2, previewGridWidth+3, previewGridWidth*2+2],
  [previewGridWidth+1, previewGridWidth+2, previewGridWidth*2+1, previewGridWidth*2+2],
  [1, previewGridWidth+1, previewGridWidth*2+1, previewGridWidth*3+1]
];
const colours = [
  ['var(--yellow-block)'],
  ['var(--green-block)'],
  ['var(--orange-block)'],
  ['var(--tourquise-block)'],
  ['var(--pink-block)'],
  ['var(--red-block)']
];
// variables and constants for the main game
var gameMatrix = Array.from(gameBox.children);
const miniMatrix = Array.from(previewBox.children);
var currentPosition = 3;
var currentRotation = 0;
var random = Math.floor(Math.random()*blocks.length);
var previewRandom
var currentBlock = blocks[random][currentRotation];
const highScoreBox = document.getElementById('highScore');
const currentLevelBox = document.getElementById('currentLevel');
const currentScoreBox = document.getElementById('currentScore');
var highScore = 0;
var currentLevel = 0;
var currentScore = 0;
var timer;

// Drawing functions
function draw(whichBlock, setting, position, whichRandom) {
  whichBlock.forEach(index => {
    setting[position + index].classList.remove('square');
    setting[position + index].classList.add('block');
    setting[position + index].style.backgroundColor = colours[whichRandom];
    setting[position + index].style.borderColor = colours[whichRandom];
  })
}

function unDraw() {
  currentBlock.forEach(index => {
    gameMatrix[currentPosition + index].classList.remove('block');
    gameMatrix[currentPosition + index].classList.add('square');
    gameMatrix[currentPosition + index].removeAttribute('style');
  })
}

function nextBlock() {
  miniMatrix.forEach(index => {
    index.classList.remove('block');
    index.classList.add('square');
    index.removeAttribute('style');
  })
  draw(previewBlocks[previewRandom], miniMatrix, 0, previewRandom)
}

// movement functions
function moveDown() {
  unDraw()
  currentPosition += gridWidth;
  draw(currentBlock, gameMatrix, currentPosition, random)
  stopMoveDown()
}

function stopMoveDown() {
  if (currentBlock.some(index => gameMatrix[currentPosition + index + gridWidth].classList.contains('taken'))) {
    currentBlock.forEach(index => gameMatrix[currentPosition + index].classList.add('taken'));
    random = previewRandom
    previewRandom = Math.floor(Math.random()*blocks.length);
    currentBlock = blocks[random][currentRotation]
    currentPosition = 3;
    currentRotation = 0;
    draw(currentBlock, gameMatrix, currentPosition, random)
    nextBlock()
    addScore()
    gameOver()
  }
}

function moveLeft () {
  const leftEdge = currentBlock.some(index => (currentPosition + index) % gridWidth === 0);
  const taken = currentBlock.some(index => gameMatrix[currentPosition + index -1].classList.contains('taken'));
  if (leftEdge || taken) {
    return;
  } else {
    unDraw()
    currentPosition -=1;
    draw(currentBlock, gameMatrix, currentPosition, random)
  }
}

function moveRight() {
  const rightEdge = currentBlock.some(index => (currentPosition + index) % gridWidth === 9);
  const taken = currentBlock.some(index => gameMatrix[currentPosition + index + 1].classList.contains('taken'));
  if (rightEdge || taken) {
    return;
  } else {
    unDraw()
    currentPosition +=1;
    draw(currentBlock, gameMatrix, currentPosition, random)
  }
}

function rotate() {
  unDraw()
  currentRotation = (currentRotation + 1) % 4;
  currentBlock = blocks[random][currentRotation];
  draw(currentBlock, gameMatrix, currentPosition, random)
}

function moveDownFaster() {
  unDraw()
  currentPosition += gridWidth;
  draw(currentBlock, gameMatrix, currentPosition, random)
  stopMoveDown()
}

// Scoring function
function addScore() {
  for (let i = 0; i < 199; i += gridWidth) {
    const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
    if (row.every(index => matrix[index].classList.contains('taken'))) {
      currentScore += 10;
      currentScoreBox.innerHTML = currentScore;
      row.forEach(index => {
        matrix[index].classList.remove('taken', 'block');
        matrix[index].classList.add('square');
        matrix[index].removeAttribute('style');
      })
      const blocksRemoved = matrix.splice(i, gridWidth);
      matrix = blocksRemoved.concat(matrix);
      matrix.forEach(cell => gameBox.appendChild(cell));
    }
  }
}

// start game function
function startGame() {
  draw(currentBlock, gameMatrix, currentPosition, random)
  timer = setInterval(moveDown, 1000);
  previewRandom = Math.floor(Math.random()*blocks.length);
  nextBlock();
}

function gameOver() {
  if (currentBlock.some(index => matrix[currentPosition + index].classList.contains('taken'))) {
  clearInterval(timer);
  let gameOverModal = document.getElementById('gameOverModal');
  gameOverModal.style.display = 'block';
  }
}
