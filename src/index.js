import './style.css';

const scoresDiv = document.querySelector('#scores');
const refreshBtn = document.querySelector('#refresh-btn');
const submitBtn = document.querySelector('#refresh-btn');
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdz/scores/';

const getScores = async () => {
  const request = await fetch(url);
  const data = await request.json();
  return data;
};

const CreateScore = (item) => {
  const scorePar = document.createElement('p');
  scorePar.textContent = `"${item.user}: ${item.score}"`;
  return scorePar;
};

const displayScores = async () => {
  const ans = await getScores();
  const scores = ans.result;
  scores.forEach((item) => {
    scoresDiv.appendChild(CreateScore(item));
  });
};

refreshBtn.addEventListener('click', (e) => {
  e.preventDefault();
  scoresDiv.innerHTML = '';
  displayScores();
});
