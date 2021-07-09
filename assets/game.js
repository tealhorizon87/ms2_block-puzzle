var gameGrid = document.getElementById('mainGrid');
var previewGrid = document.getElementById('previewGrid');
var gridSquare = document.createElement('div');

for (let i = 0; i < 200; i++) {
  gameGrid.appendChild(gridSquare.cloneNode(true));
}
for (let i = 0; i < 9; i++) {
  previewGrid.appendChild(gridSquare.cloneNode(true));
}
