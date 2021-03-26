const random_quote = "http://api.quotable.io/random";
const displays = document.getElementById("quote");
const inputs = document.getElementById("quotes");
const times = document.getElementById("timer");

inputs.addEventListener("input", () => {
  const arrayQuote = displays.querySelectorAll("span");
  const arrayValue = inputs.value.split("");

  let correct = true;
  arrayQuote.forEach((span, index) => {
    const character = arrayValue[index];
    if (character == null) {
      span.classList.remove("correct");
      span.classList.remove("incorrect");
      correct = false;
    } else if (character === span.innerText) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
    } else {
      span.classList.remove("correct");
      span.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) newQuote();
});

function randomQuote() {
  return fetch(random_quote)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function newQuote() {
  const quote = await randomQuote();
  displays.innerHTML = "";
  quote.split("").forEach((character) => {
    const span = document.createElement("span");
    span.innerText = character;
    displays.appendChild(span);
  });
  inputs.value = null;
  startTimer();
}

let startTime;
function startTimer() {
  times.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

newQuote();
