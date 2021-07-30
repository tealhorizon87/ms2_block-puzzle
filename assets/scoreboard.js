// ATTRIBUTION: Most of this code was taken from the
// jamesqquick YouTube video. See README for further

// constants relating to the scoreboard
const saveScoreButton = document.getElementById("saveScoreButton");
const highScoreBox = document.getElementById("highScoreBox");
const scoreboardListBox = document.getElementById("scoreboardListBox");
var scoreboardEntry = document.createElement("li");
// constant that will either load the array from local or
// an array with a dummy value
const highScores = JSON.parse(localStorage.getItem("highScores")) || [
  {name: name, score: 0}
];

// populates the highscore section with the highest saved score
highScoreBox. innerHTML = `${highScores[0].name} - ${highScores[0].score}`;

// populates the scoreboard modal with the top 10 scores
for (entry in highScores) {
    scoreboardEntry.textContent = `${highScores[entry].name} - ${highScores[entry].score}`;
    scoreboardListBox.appendChild(scoreboardEntry.cloneNode(true));
}

// event listener to start the score saving function
saveScoreButton.addEventListener("click", saveHighScore);

// function to save the scores
function saveHighScore(event) {
  event.preventDefault();

  const score = {
    name: playerName.value,
    score: currentScore
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(10);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  highScoreBox. innerHTML = `${highScores[0].name} - ${highScores[0].score}`;
}
