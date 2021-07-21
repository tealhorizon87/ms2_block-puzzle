const saveScoreButton = document.getElementById('saveScoreButton');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

saveScoreButton.addEventListener('click', saveHighScore);

function saveHighScore(event) {
  event.preventDefault();

  const score = {
    name: playerName.value,
    score: currentScore
  };
  highScores.push(score);
  highScores.sort((a, b) => a.score - b.score);
  highScores.splice(5);

  localStorage.setItem('highScores', JSON.stringify(highScores));

  console.log(highScores);
}
