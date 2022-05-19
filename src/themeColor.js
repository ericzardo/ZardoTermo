const $body = document.getElementsByTagName("body")[0];
const $helpBox = document.getElementById("help-box");
const $statsBox = document.getElementById("stats-box");
const $attempts = document.getElementById("board").children;
const $keyboardButtons = document.getElementById("keyboard").children;

const lightBoxesColor = "rgb(50, 58, 69)";
const lightBackgroundColor = "rgb(119, 136, 152)";
const lightBorderColor = "rgb(0, 80, 115)";
const lightBoardColor = "rgb(63, 97, 132, 0.4)";
const lightKeyboardColor = "rgb(0, 80, 115)";

const darkBackgroundColor = "rgb(21, 32, 43)";
const darkBoxesColor = "rgb(49, 43, 45)";
const darkBorderColor = "rgb(76, 67, 71)";
const darkBoardColor = "rgb(97, 84, 88, 0.65)";
const darkKeyboardColor = "rgb(76, 67, 71)";

const changeBackgroundColor = (color, item) => {
  item.style.background = color;
}

const changeBoxesColor = () => {
  if ($body.style.background !== darkBackgroundColor) {
    changeBackgroundColor(lightBoxesColor, $helpBox);
    changeBackgroundColor(lightBoxesColor, $statsBox);
    return;
  }
  changeBackgroundColor(darkBoxesColor, $helpBox);
  changeBackgroundColor(darkBoxesColor, $statsBox)
}


const changeSpacesColor = () => {
  for (let i = 0; i < $attempts.length; i++) {
    const attempt = $attempts[i];

    for (const spaceLetter of attempt.children) {
      if ($body.style.background !== darkBackgroundColor) {
        changeBackgroundColor(lightBoardColor, spaceLetter);
        if (attempt.id === "active") {
          spaceLetter.style.background = "inherit";
          spaceLetter.style.borderColor = lightBorderColor;
        }
      } else {
        changeBackgroundColor(darkBoardColor, spaceLetter);
        if (attempt.id === "active") {
          spaceLetter.style.background = "inherit";
          spaceLetter.style.borderColor = darkBorderColor;
        }
      }
    }
  }

}

const changeKeyboardColor = () => {

  for (const button of $keyboardButtons) {
    if ($body.style.background !== darkBackgroundColor) {
      changeBackgroundColor(lightKeyboardColor, button);
    } else {
      changeBackgroundColor(darkKeyboardColor, button);
    }
  }
}

const updateColors = (object) => {

  if (object.config.themeColor === 0) {
    changeBackgroundColor(lightBackgroundColor, $body);
    changeBoxesColor();
    changeSpacesColor();
    changeKeyboardColor();
    return;
  }
  changeBackgroundColor(darkBackgroundColor, $body);
  changeBoxesColor();
  changeSpacesColor();
  changeKeyboardColor();

}

updateColors(JSON.parse(window.localStorage.getItem("ZDOterm")));


document.getElementById("color-button").addEventListener("click", e => {
  const ZDOterm = JSON.parse(window.localStorage.getItem("ZDOterm"));

  if (ZDOterm.config.themeColor === 0) {
    ZDOterm.config.themeColor = 1;
  } else {
    ZDOterm.config.themeColor = 0;
  }

  window.localStorage.setItem("ZDOterm", JSON.stringify(ZDOterm));

  updateColors(ZDOterm);
})

export { changeSpacesColor }