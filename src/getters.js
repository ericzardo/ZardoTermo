const getCurrentLetter = () => {
  const activeAttempt = document.getElementById("active");
  const currentLetter = [];
  
  for (let i = 0; i < activeAttempt.children.length; i++) {

    if (activeAttempt.children[i].classList.contains("current")) {
      currentLetter[0] = activeAttempt.children[i];
      currentLetter[1] = i;
      break;
    }
  }
  return currentLetter;
}

const getNextVoidSpace = (attempt, index = undefined) => {

  for (let i = index; i < attempt.length; i++) {
    if (attempt[i].textContent === "") {
      return i
    }
  }

  for (let i = 0; i < attempt.length; i++) {
    if (attempt[i].textContent === "") {
      index = i;
      break;
    }
  }

  if (index >= attempt.length - 1 && attempt[attempt.length - 1].textContent !== "") {
    index = undefined;
  }
  return index;
}

export { getCurrentLetter, getNextVoidSpace }