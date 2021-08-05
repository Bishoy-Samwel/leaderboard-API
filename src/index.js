import './style.css';

const scoresDiv = document.querySelector('#scores');
const refreshBtn = document.querySelector('#refresh-btn');
const submitBtn = document.querySelector('#submit-btn');
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ATKgqVUa9t3EVioWm1UK/scores';

const CreateScore = (item) => {
  const scorePar = document.createElement('p');
  scorePar.textContent = `${item.user}: ${item.score}`;
  return scorePar;
};

const sendData = async (user, score) => {
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ user, score }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then((response) => response.json());
};

const addScore = async () => {
  const user = document.querySelector('#user-txt').value;
  const score = document.querySelector('#score-txt').value;
  if (user.length && Number.isInteger(parseInt(score, 10))) {
    scoresDiv.appendChild(CreateScore({ user, score }));
    await sendData(user, score);
  }
};

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addScore();
  document.querySelector('form').reset();
});

const getScores = async () => {
  const request = await fetch(url);
  const data = await request.json();
  return data;
};

const displayScores = async () => {
  const ans = await getScores();
  const scores = ans.result;
  scoresDiv.innerHTML = '';
  scores.forEach((item) => {
    scoresDiv.appendChild(CreateScore(item));
  });
};

refreshBtn.addEventListener('click', (e) => {
  e.preventDefault();
  displayScores();
});

displayScores();