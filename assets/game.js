// variables for game-grid and preview-grid
var gameGrid = document.getElementById('mainGrid');
var previewGrid = document.getElementById('previewGrid');
var gridSquare = document.createElement('div');

// variables for (instructions)modal operations
var instructionsModal = document.getElementById('instructionsModal');
var instructionsButton = document.getElementById('instructionsButton');
var closeInstructions = document.getElementsByClassName('close')[0];

// variables for (contact)modal operations
var contactModal = document.getElementById('contactModal');
var contactButton = document.getElementById('contactButton');

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
  instructionsModal.style.display = 'block';
}
contactButton.onclick = function() {
  contactModal.style.display = 'block';
}

closeInstructions.onclick = function() {
  instructionsModal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == instructionsModal) {
    instructionsModal.style.display = 'none';
  }
  if (event.target == contactModal) {
    contactModal.style.display = 'none';
  }
}

// call necessary functions
drawGrids()
