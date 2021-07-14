// variables and constants used to draw the grids
const gameGrid = document.getElementById('mainGrid');
const previewGrid = document.getElementById('previewGrid');
const gridSquare = document.createElement('div');

// Event listener to draw the grids when the page has loaded
document.addEventListener('DOMContentLoaded', drawGrids);

// Button constants
const instructionsButton = document.getElementById('instructionsButton');
const contactButton = document.getElementById('contactButton');
const menuButton = document.getElementById('menuButton');
const closeButton = document.getElementById('close');
const startPauseButton = document.getElementById('startButton');

// Modal constants
const instructionsModal = document.getElementById('instructionsModal');
const contactModal = document.getElementById('contactModal');
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
// an array containing all the blocks, and an array for the colours
const jBlock = [
  [1, 2, 11, 21],
  [10, 11, 12, 22],
  [1, 11, 20, 21],
  [0, 10, 11, 12]
];
const lBlock = [
  [0, 1, 11, 21],
  [2, 10, 11, 12],
  [1, 11, 21, 22],
  [10, 11, 12, 20]
];
const zBlock = [
  [0, 1, 11, 12],
  [1, 10, 11, 20],
  [0, 1, 11, 12],
  [1, 10, 11, 20]
];
const tBlock = [
  [0, 1, 2, 11],
  [1, 10, 11, 21],
  [1, 10, 11, 12],
  [1, 11, 12, 21]
];
const oBlock = [
  [0, 1, 10, 11],
  [0, 1, 10, 11],
  [0, 1, 10, 11],
  [0, 1, 10, 11]
];
const iBlock = [
  [1, 11, 21, 31],
  [10, 11, 12, 13],
  [1, 11, 21, 31],
  [10, 11, 12, 13]
];
const blocks = [jBlock, lBlock, zBlock, tBlock, oBlock, iBlock];
const previewBlocks = [
  [5, 6, 9, 13],
  [5, 6, 10, 14],
  [5, 6, 10, 11],
  [5, 6, 7, 10],
  [5, 6, 9, 10],
  [1, 5, 9, 13]
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
const gridWidth = 10;
var matrix
var previewMatrix
var currentPosition = 3;
var currentRotation = 0;
var random = Math.floor(Math.random()*blocks.length);
var previewRandom
var currentBlock = blocks[random][currentRotation];
// var previewBlock = previewBlocks[previewRandom];

// function to draw out the main and preview grids
function drawGrids() {
  for (let i = 0; i < 201; i++) {
    gameGrid.appendChild(gridSquare.cloneNode(true));
    gridSquare.classList.add('square');
  }
  for (let i = 0; i < 16; i++) {
    previewGrid.appendChild(gridSquare.cloneNode(true));
    gridSquare.classList.add('square');
  }
  gameGrid.children[0].remove();
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
  // currentBlock = blocks[previewRandom][currentRotation];
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

// movement function
function moveDown() {
  unDraw()
  currentPosition += gridWidth;
  draw()
}

function startGame() {
  matrix = Array.from(gameGrid.children);
  previewMatrix = Array.from(previewGrid.children);
  draw();
  setInterval(moveDown, 1000);
  previewRandom = Math.floor(Math.random()*blocks.length);
  displayPreview();
}
