console.log("connected");
const winingElm = document.querySelector(".lucky-number span");
const p1ScoreElm = document.querySelector(".p1");
const p2ScoreElm = document.querySelector(".p2");
const p1BtnElm = document.querySelector(".p1btn");
const p2BtnElm = document.querySelector(".p2btn");
const formElm = document.querySelector("form");
const resetbtn = document.querySelector("#resetbtn");
const inputElm = document.querySelector("#luck-input");
const winPlayerElm = document.querySelector(".winner");
// setting data memory

let p1score;
let p2score;
let p1turn;
let p2turn;
let winingScore;
let isGameOver;

function setRandomPlayer() {
  const playerArr = ["p1Turn", "p2Turn"];
  const num = Math.floor(Math.random() * playerArr.length);
  console.log(num);
  const player = playerArr[num];
  return player;
}

function setInitilValues() {
  p1score = 0;
  p2score = 0;
  p1turn = true;
  p2turn = false;
  winingScore = 10;
  isGameOver = false;
}
setInitilValues();
function validateinput(inputVal) {
  let isInvalid = false;
  // checking whether user input the value is empty or a real number
  // NaN!=NaN its output is true because it does not produce a real number
  if (!inputVal || inputVal !== inputVal) {
    alert("input a correct value");
    isInvalid = true;
  }
  return isInvalid;
}
function resetInput() {
  // reset the input
  inputElm.value = "";
}

function defaultValueDom() {
  winingElm.textContent = winingScore;
  p1ScoreElm.textContent = p1score;
  p2ScoreElm.textContent = p2score;

  if (!p1turn) {
    p1BtnElm.setAttribute("disabled", "disabled");
  }
  if (!p2turn) {
    p2BtnElm.setAttribute("disabled", "disabled");
  }
}
defaultValueDom();

function setDisableplayerBtn() {
  p1BtnElm.setAttribute("disabled", "disabled");
  p2BtnElm.setAttribute("disabled", "disabled");
}

// handling submit part
formElm.addEventListener("submit", (evt) => {
  //prevent default browser
  evt.preventDefault();

  const inputVal = Number(inputElm.value); //(getting the input value)and  convert to a number

  const invalidOrvalid = validateinput(inputVal);
  // if (isInvalid) return;

  //   reset the input
  resetInput();
  // setting on wining score inputed value by user will show to this wining score
  //setting data on memory
  winingScore = inputVal; //winingScore is a Dom memory
  winingElm.innerHTML = inputVal; // user inputed value will fixed to the wining score innerHtml or textcontent
  console.log(inputVal);
});

// handling with player click
p1BtnElm.addEventListener("click", (evt) => {
  if (p1turn) {
    p1score++;
    p1ScoreElm.textContent = p1score;
  }
  p1turn = false;
  p1BtnElm.setAttribute("disabled", "disabled");
  p2turn = true;
  p2BtnElm.removeAttribute("disabled");
  //checking winner state
  if (p1score === winingScore) {
    isGameOver = true;

    winPlayerElm.textContent = "player1 is winner";
  }
});

p2BtnElm.addEventListener("click", (evt) => {
  // memory data update
  if (p2turn) {
    p2score++;
    //Dom update
    p2ScoreElm.textContent = p2score;
  }
  p2BtnElm.setAttribute("disabled", "disabled");
  p2turn = false;
  p1turn = true;
  //checking winner state
  p1BtnElm.removeAttribute("disabled");
  if (p2score === winingScore) {
    isGameOver = true;
    setDisableplayerBtn(); //(function call) p1btn and p2btn disabled when wining score is equal

    winPlayerElm.textContent = "player2 is winner";
  }
});

resetbtn.addEventListener("click", (evt) => {
  setInitilValues();
  defaultValueDom();
});
