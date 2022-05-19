import { checkWord, lettersOnWord, wrongAttempt, attemptResult } from "./manipulationAttempt.js";
import { getCurrentLetter, getNextVoidSpace } from "./getters.js";
import { finalWord } from "../main.js";
import { changeSpacesColor } from "./themeColor.js"

let attempts = document.getElementById("board").children;
let activeAttempt = document.getElementById("active");

const activeCurrentLetter = (index) => {
  for (let i = 0; i < activeAttempt.children.length; i++) {
    activeAttempt.children[i].classList.remove("current");
  }
  if (index < activeAttempt.children.length) {
    activeAttempt.children[index].className = "letter current";
  }
}

const keyDownLetter = (code) => {

  if (code.toLowerCase() === "backspace") {
    deleteCurrentLetter()
    return;
  }
  if (code.toLowerCase() === "enter") {
    sendWord()
    return;
  }

  if (!(/[a-zA-Z]/.test(code)) || code.length !== 1) return;
  addValueToLetter(code.toUpperCase());
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
    activeCurrentLetter(indexCurrentLetter)
    return;
  }
  const previousLetter = activeAttempt.children[Math.max(indexCurrentLetter - 1, 0)];
  previousLetter.textContent = "";
  activeCurrentLetter(Math.max(indexCurrentLetter - 1, 0))
}

const sendWord = () => {
  let word = ""
  for (const letter of activeAttempt.children) {
    if (letter.textContent !== "") {
      word += letter.textContent;
    }
  }

  if (!(checkWord(word)) || word.length !== activeAttempt.children.length) {

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

    const charsClasses = lettersOnWord(word, finalWord);
    attemptResult(activeAttempt, charsClasses);

    attempts = document.getElementById("board").children;
    if (newIndex >= attempts.length) {

      ZDOterm.stats.curstreak = 0;
      ZDOterm.stats.games += 1;
      ZDOterm.stats.indexWord += 1;
      window.localStorage.setItem("ZDOterm", JSON.stringify(ZDOterm));
      document.location.reload();
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
  ZDOterm.stats.indexWord += 1;
  if (ZDOterm.stats.curstreak >= ZDOterm.stats.maxstreak) {
    ZDOterm.stats.maxstreak = ZDOterm.stats.curstreak;
  }

  window.localStorage.setItem("ZDOterm", JSON.stringify(ZDOterm));
  alert("Parabens");
  document.location.reload();
}

export { activeCurrentLetter, keyDownLetter, addValueToLetter, deleteCurrentLetter }