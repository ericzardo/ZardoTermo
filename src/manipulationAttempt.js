import { words } from "./data.js";

const letterCount = (word) => {
  const letters = {};
  for (const letter of word) {
    if (!(letter in letters)) {
      letters[letter.toLowerCase()] = 0;
    }
    letters[letter.toLowerCase()] += 1;
  }
  return letters;
}

const checkWord = (word) => {
  if (words.includes(word)) return true;

  const letters = letterCount(word);

  if (!(Object.keys(letters).length >= 2)) return false;
  return true;
}

const lettersOnWord = (word, finalWord) => {
  const classOfChar = [null, null, null, null, null]

  const lettersCorrects = [];

  for (let i = 0; i < word.length; i++) {
    const charWord = word[i].toLowerCase();
    const charFinalWord = finalWord[i].toLowerCase();

    if (charWord === charFinalWord) {
      classOfChar[i] = "correct";
      lettersCorrects.push(charWord);
    }
  }

  for (let i = 0; i < word.length; i++) {
    if (classOfChar[i] !== null) continue;

    const charWord = word[i].toLowerCase();

    if (finalWord.includes(charWord) && !(lettersCorrects.includes(charWord))) {
      lettersCorrects.push(charWord);
      classOfChar[i] = "place";
      continue;
    }
    classOfChar[i] = "incorrect";
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