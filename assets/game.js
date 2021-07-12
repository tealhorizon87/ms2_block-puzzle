// variables for game-grid and preview-grid
const gameGrid = document.getElementById('mainGrid');
const previewGrid = document.getElementById('previewGrid');
var gridSquare = document.createElement('div');
var matrix
var previewMatrix

// variables for modal event listeners
var instructionsButton = document.getElementById('instructionsButton');
var contactButton = document.getElementById('contactButton');
var menuButton = document.getElementById('menuButton');
var closeButton = document.getElementById('close');
var instructionsModal = document.getElementById('instructionsModal');
var contactModal = document.getElementById('contactModal');
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

// event listener to draw the grids when the page has loaded
document.addEventListener('DOMContentLoaded', drawGrids())


// function to draw out the main and preview grids
function drawGrids() {
  for (let i = 0; i < 200; i++) {
    gameGrid.appendChild(gridSquare.cloneNode(true));
  }
  for (let i = 0; i < 9; i++) {
    previewGrid.appendChild(gridSquare.cloneNode(true));
  }
  matrix = Array.from(gameGrid.children);
  previewMatrix = Array.from(previewGrid.children);
}
