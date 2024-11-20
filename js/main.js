const GAME_TIME = 9;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

console.log(wordInput);
console.log(wordDisplay);

init();
function init() {
  buttonChange("게임로딩중..");
  getWords();
  wordInput.addEventListener("input", checkMatch);
}

function run() {
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  time = GAME_TIME;
  wordInput.focus();
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
  buttonChange("게임중");
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    buttonChange("게임시작");
    clearInterval(checkInterval);
  }
}

function getWords() {
  //
  words = ["h", "b", "a", "c"];
  axios
    .get("https://random-word-api.herokuapp.com/word?number=100")
    .then(function (response) {
      // 성공 핸들링
      //console.log(response.data);
      response.data.forEach((word) => {
        //console.log(word.length);
        if (word.length < 10) {
          console.log(word);
          words.push(word);
        }
      });
      buttonChange("게임_시작");
    })
    .catch(function (error) {
      // 에러 핸들링
      console.log(error);
    });

  console.log(words);
}

function checkMatch() {
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = "";
    if (!isPlaying) {
      return;
    }
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random() * words.length);
    console.log(randomIndex);
    wordDisplay.innerText = words[randomIndex];
  }
}

//setInterval(countDown, 1000);

function countDown() {
  time > 0 ? time-- : (isPlaying = false);
  if (!isPlaying) {
    clearInterval(timeInterval);
  }
  timeDisplay.innerText = time;
}

function buttonChange(text) {
  button.innerText = text;
  text === "게임시작"
    ? button.classList.remove("loading")
    : button.classList.add("loading");
}
