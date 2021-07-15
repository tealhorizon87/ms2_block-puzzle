// variables and constants used to draw the grids
const mainGrid = document.getElementById('mainGrid');
const previewGrid = document.getElementById('previewGrid');
const gridSquare = document.createElement('div');

// Event listener to draw the grids when the page has loaded
document.addEventListener('DOMContentLoaded', drawGrids);

// Button constants
const instructionsButton = document.getElementById('instructionsButton');
const scoreboardButton = document.getElementById('scoreboardButton');
const contactButton = document.getElementById('contactButton');
const menuButton = document.getElementById('menuButton');
const closeButton = document.getElementById('close');
const startPauseButton = document.getElementById('startButton');
const startButtonSmall = document.getElementById('startButtonSmall');
const instructionsButtonSmall = document.getElementById('instructionsButtonSmall');
const scoreboardButtonSmall = document.getElementById('scoreboardButtonSmall');
const buttons = [
  instructionsButton,
  scoreboardButton,
  contactButton,
  menuButton,
  closeButton,
  startPauseButton,
  startButtonSmall,
  instructionsButtonSmall,
  scoreboardButtonSmall
];

// Modal constants
const instructionsModal = document.getElementById('instructionsModal');
const contactModal = document.getElementById('contactModal');
const menuModal = document.getElementById('menuModal');
const modals = [
  instructionsModal,
  contactModal,
  menuModal
];

// modal event listeners
instructionsButton.addEventListener('click', function() {
  instructionsModal.style.display = 'block';
})
contactButton.addEventListener('click', function() {
  contactModal.style.display = 'block';
})
menuButton.addEventListener('click', function() {
  menuModal.style.display = 'block';
})
closeButton.addEventListener('click', function() {
  instructionsModal.style.display = 'none';
})
window.addEventListener('click', function () {
  if (event.target == instructionsModal) {
    instructionsModal.style.display = 'none';
  }
  if (event.target == contactModal) {
    contactModal.style.display = 'none';
  }
  if (event.target == menuModal) {
    menuModal.style.display = 'none';
  }
})

// Event listener for the start button in order to start the game
startPauseButton.addEventListener('click', startGame);

// constants containing the arrays for the blocks and their rotations,
// an array containing all the blocks and one to contain the preview blocks,
// and an array for the colours
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
];
const iBlock = [
  [1, gridWidth+1, gridWidth*2+1, gridWidth*3+1],
  [gridWidth, gridWidth+1, gridWidth+2, gridWidth+3],
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
var matrix
var previewMatrix
var currentPosition = 3;
var currentRotation = 0;
var random = Math.floor(Math.random()*blocks.length);
var previewRandom
var currentBlock = blocks[random][currentRotation];

// function to draw out the main and preview grids
function drawGrids() {
  for (let i = 0; i < 200; i++) {
    mainGrid.appendChild(gridSquare.cloneNode(true));
    gridSquare.classList.add('square');
  }
  for (let i = 0; i < 11; i++) {
  mainGrid.appendChild(gridSquare.cloneNode(true));
  gridSquare.classList.add('taken');
  }
  for (let i = 0; i < 16; i++) {
    previewGrid.appendChild(gridSquare.cloneNode(true));
    gridSquare.classList.add('square');
  }
  mainGrid.children[0].remove();
}

// Draw a block
function draw() {
  currentBlock.forEach(index => {
    matrix[currentPosition + index].classList.remove('square');
    matrix[currentPosition + index].classList.add('block');
    matrix[currentPosition + index].style.backgroundColor = colours[random];
    matrix[currentPosition + index].style.borderColor = colours[random];
  })
}

function previewDraw() {
  previewBlocks[previewRandom].forEach(index => {
    previewMatrix[index].classList.remove('square');
    previewMatrix[index].classList.add('block');
    previewMatrix[index].style.backgroundColor = colours[previewRandom];
    previewMatrix[index].style.borderColor = colours[previewRandom];
  })
}

// Undraw a block
function unDraw() {
  currentBlock.forEach(index => {
    matrix[currentPosition + index].classList.remove('block');
    matrix[currentPosition + index].classList.add('square');
    matrix[currentPosition + index].removeAttribute('style');
  })
}

function previewUnDraw() {
  previewMatrix.forEach(index => {
    index.classList.remove('block');
    index.classList.add('square');
    index.removeAttribute('style');
  })
}

// Display the next block in the preview grid
function displayPreview() {
  previewUnDraw()
  previewDraw()
}

// movement functions
function moveDown() {
  unDraw()
  currentPosition += gridWidth;
  draw()
  stopMoveDown()
}

function stopMoveDown() {
  if (currentBlock.some(index => matrix[currentPosition + index + gridWidth].classList.contains('taken'))) {
    currentBlock.forEach(index => matrix[currentPosition + index].classList.add('taken'));
    random = previewRandom
    previewRandom = Math.floor(Math.random()*blocks.length);
    currentBlock = blocks[random][currentRotation]
    currentPosition = 3;
    draw()
    displayPreview()
  }
}

function startGame() {
  matrix = Array.from(mainGrid.children);
  previewMatrix = Array.from(previewGrid.children);
  draw();
  setInterval(moveDown, 1000);
  previewRandom = Math.floor(Math.random()*blocks.length);
  displayPreview();
}
