// variables for game-grid and preview-grid
var gameGrid = document.getElementById('mainGrid');
var previewGrid = document.getElementById('previewGrid');
var gridSquare = document.createElement('div');

// variables for modal operations
var modal = document.getElementById('instructionsModal');
var instructionsButton = document.getElementById('instructionsButton');
var close = document.getElementsByClassName('close')[0];

// FOR loops to populate the game-grid and preview-grid
function drawGrids() {
  for (let i = 0; i < 200; i++) {
    gameGrid.appendChild(gridSquare.cloneNode(true));
  }
  for (let i = 0; i < 9; i++) {
    previewGrid.appendChild(gridSquare.cloneNode(true));
  }
}

// modal operations
instructionsButton.onclick = function() {
  modal.style.display = 'block';
}
close.onclick = function() {
  modal.style.display = 'none';
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// call necessary functions
drawGrids()
