import { finalWord } from "../main.js";

const checkWord = (word) => {
  const countLetters = {};

  for (const letter of word) {
    if (!(letter in countLetters)) {
      countLetters[letter] = 0;
    }
    countLetters[letter] += 1;
  }
  return countLetters;
}

const lettersOnWord = (word) => {
  const classOfChar = [];
  const chars = [];


  for (let i = 0; i < word.length; i++) {
    const char = word[i].toLowerCase();
    const finalChar = finalWord[i];

    if (!finalWord.includes(char)) {
      classOfChar.push("incorrect");
      continue;
    }
    if (char === finalChar) {
      classOfChar.push("correct");
      continue;
    }
    classOfChar.push("place");

  }
  return classOfChar;
}

const wrongAttempt = () => {
  const activeAttempt = document.getElementById("active");
  activeAttempt.classList += " not-word";
  setTimeout(() => {
    activeAttempt.classList.remove("not-word");
  }, 1000)
}

const attemptResult = (attempt, charsClasses) => {
  for (let i = 0; i < attempt.children.length; i++) {
    const letter = attempt.children[i];
    const charClass = charsClasses[i];

    letter.classList += " " + charClass;
  }
}

export { checkWord, lettersOnWord, wrongAttempt, attemptResult }