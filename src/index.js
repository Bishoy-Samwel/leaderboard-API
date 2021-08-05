import './style.css';

const scoresDiv = document.querySelector('#scores');
const refreshBtn = document.querySelector('#refresh-btn');
const submitBtn = document.querySelector('#submit-btn');
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/W17IP19R1ub134pDoyGK/scores/';

const CreateScore = (item) => {
  const scorePar = document.createElement('p');
  scorePar.textContent = `${item.name}: ${item.score}`;
  return scorePar;
};

const sendData = async (name, score) => {
  await fetch('url', {
    method: 'POST',
    body: JSON.stringify({ name, score }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then((response) => response.json());
};

const addScore = async () => {
  const name = document.querySelector('#name-txt').value;
  const score = document.querySelector('#score-txt').value;
  if (name.length && Number.isInteger(parseInt(score, 10))) {
    scoresDiv.appendChild(CreateScore({ name, score }));
    await sendData(name, score);
  }
};



const getScores = async () => {
  const request = await fetch(url);
  const data = await request.json();
  return data;
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
