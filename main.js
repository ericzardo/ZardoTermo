import "./src/storage.js";
import { words } from "./src/data.js";
import { getCurrentLetter, getNextVoidSpace } from "./src/getters.js";
import { checkWord, lettersOnWord, wrongAttempt, attemptResult } from "./src/manipulationAttempt.js";
import "./src/themeColor.js";
import { changeSpacesColor } from "./src/themeColor.js";

const finalWord = words[Math.floor(Math.random() * words.length)];

const body = document.getElementsByTagName("body")[0];
let attempts = document.getElementById("board").children;
let activeAttempt = document.getElementById("active");

document.getElementById("help-button").addEventListener("click", e => {
  const helpBox = document.getElementById("help-box");
  if (helpBox.style.display !== "flex") {
    helpBox.style.display = "flex";
    return;
  }
  helpBox.style.display = "none";
})

document.getElementById("random-button").addEventListener("click", e => {
  document.location.reload();
})

body.addEventListener("keyup", e => {
  const currentIndexLetter = getCurrentLetter(activeAttempt.children)[1];

  if (e.code === "ArrowLeft") {
    activeCurrentLetter(Math.max(currentIndexLetter - 1, 0));
    return;
  }
  if (e.code === "ArrowRight") {
    activeCurrentLetter(Math.min(currentIndexLetter + 1, activeAttempt.children.length));
    return;
  }
  keyDownLetter(e.code);
})

activeAttempt.addEventListener("click", e => {
  for (let i = 0; i < activeAttempt.children.length; i++) {
    const space = activeAttempt.children[i];
    space.addEventListener("click", e => {
      activeCurrentLetter(i);
    })
  }
})

const activeCurrentLetter = (index) => {
  for (let i = 0; i < activeAttempt.children.length; i++) {
    activeAttempt.children[i].classList.remove("current");
  }
  if (index < activeAttempt.children.length) {
    activeAttempt.children[index].className = "letter current";
  }
}

const keyDownLetter = (code) => {
  const letter = code.slice(3);


  if (code.toLowerCase() === "backspace") {
    deleteCurrentLetter()
    return;
  }
  if (code.toLowerCase() === "enter") {
    sendWord()
    return;
  }
  if (!(code.slice(0, 3).toLowerCase() === "key")) return;

  addValueToLetter(letter);

}

const keyboard = document.getElementById("keyboard").children;
for (const button of keyboard) {
  button.addEventListener("click", e => {
    keyDownLetter(button.value);
  })
}

const addValueToLetter = (letter) => {

  const currentLetter = getCurrentLetter(activeAttempt.children)[0];
  const currentIndexLetter = getCurrentLetter(activeAttempt.children)[1];

  if (currentLetter) {
    currentLetter.textContent = letter;
    currentLetter.classList += " animated"
  }

  const index = getNextVoidSpace(activeAttempt.children, currentIndexLetter);
  activeCurrentLetter(index);

}

const deleteCurrentLetter = () => {

  let currentLetter = getCurrentLetter(activeAttempt.children)[0];
  let indexCurrentLetter = getCurrentLetter(activeAttempt.children)[1];

  if (!currentLetter) {
    currentLetter = activeAttempt.children[activeAttempt.children.length - 1];
    indexCurrentLetter = activeAttempt.children.length - 1;
  }
  if (currentLetter.textContent !== "") {
    currentLetter.textContent = "";
    activeCurrentLetter(Math.max(indexCurrentLetter - 1, 0))
    return;
  }
  const previousLetter = activeAttempt.children[Math.max(indexCurrentLetter - 1, 0)];
  previousLetter.textContent = "";
  activeCurrentLetter(Math.max(indexCurrentLetter - 1, 0))
}

const sendWord = () => {
  let word = ""
  console.log(finalWord);
  for (const letter of activeAttempt.children) {
    if (letter.textContent !== "") {
      word += letter.textContent;
    }
  }

  if (word.length !== activeAttempt.children.length ||
    Object.keys(checkWord(word)).length < activeAttempt.children.length - 2) {

    wrongAttempt();
    return;
  }

  const ZDOterm = JSON.parse(window.localStorage.getItem("ZDOterm"));

  if (word.toLowerCase() !== finalWord.toLowerCase()) {
    let newIndex = 0

    for (const attempt of attempts) {
      newIndex += 1;
      if (attempt.id == "active") {
        attempt.removeAttribute("id");
        break;
      }
    }

    for (const space of activeAttempt.children) {
      space.classList.remove("current");
    }

    const charsClasses = lettersOnWord(word);
    attemptResult(activeAttempt, charsClasses);

    attempts = document.getElementById("board").children;
    if (newIndex >= attempts.length) {

      ZDOterm.stats.curstreak = 0;
      ZDOterm.stats.games += 1;
      window.localStorage.setItem("ZDOterm", JSON.stringify(ZDOterm));
      return;
    }
    attempts[Math.min(newIndex, attempts.length - 1)].id = "active";
    activeAttempt = document.getElementById("active");
    changeSpacesColor();

    activeAttempt.children[0].classList += " current";
    return;
  }

  ZDOterm.stats.wins += 1;
  ZDOterm.stats.games += 1;
  ZDOterm.stats.curstreak += 1;
  if (ZDOterm.stats.curstreak >= ZDOterm.stats.maxstreak) {
    ZDOterm.stats.maxstreak = ZDOterm.stats.curstreak;
  }

  window.localStorage.setItem("ZDOterm", JSON.stringify(ZDOterm));
  alert("Parabens");
}

export { finalWord }