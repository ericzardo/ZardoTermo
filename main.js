import "./src/storage.js";
import { words } from "./src/data.js";
import { getCurrentLetter } from "./src/getters.js";
import { activeCurrentLetter, keyDownLetter } from "./src/inputs.js";

const ZDOterm = JSON.parse(window.localStorage.getItem("ZDOterm"));
const finalWord = words[Math.min(ZDOterm.stats.indexWord, words.length - 1)];

const activeAttempt = document.getElementById("active");

$(document).ready(() => {

  $("#help-button").on("click", () => {
    if ($("#stats-box").is(":visible") || $("#help-box").is(":visible")) {
      $("#help-box").css("display", "none");
      return;
    }
    $("#help-box").css("display", "flex");
  })


  $("#stats-button").on("click", () => {
    if ($("#stats-box").is(":visible") || $("#help-box").is(":visible")) {
      $("#stats-box").css("display", "none");
      return;
    }
    let wins = Math.round(ZDOterm.stats.wins / ZDOterm.stats.games * 100);
    if (isNaN(wins)) wins = 0;
    $("#stats-box").html(`
      <h2>estatísticas</h2>
      <div class= "stats-table" >
        <b id="stats-games">${ZDOterm.stats.games}</b>
        <p>jogos</p>
        <b id="stats-wins">${wins}%</b>
        <p>de vitórias</p>
        <b id="stats-streak">${ZDOterm.stats.curstreak}</b>
        <p>sequência de vitórias</p>
        <b id="stats-maxstreak">${ZDOterm.stats.maxstreak}</b>
        <p>melhor sequência</p>
      </div>
    `)
    $("#stats-box").css("display", "flex");
  })

  $("#random-button").on("click", () => {
    document.location.reload();
  })

  $("body").on("keyup click", e => {
    const currentIndexLetter = getCurrentLetter(activeAttempt.children)[1];

    if (e.type === "click") {
      if (e.target !== $("#help-button")[0] && e.target !== $("#stats-button")[0] &&
        (!($("#stats-box").is(":visible")) || !($("#help-box").is(":visible")))) {

        $("#stats-box").css("display", "none");
        $("#help-box").css("display", "none");
      }
      return;
    }

    if (e.key === "ArrowLeft") {
      activeCurrentLetter(Math.max(currentIndexLetter - 1, 0));
      return;
    }
    if (e.key === "ArrowRight") {
      activeCurrentLetter(Math.min(currentIndexLetter + 1, activeAttempt.children.length - 1));
      return;
    }
    keyDownLetter(e.key);
  })

  $("#active").children("div").on("click", e => {
    activeCurrentLetter($("#active").children("div").index(e.target));
  })

  $("#keyboard").children("button").on("click", e => {
    e.target.value !== undefined ? keyDownLetter(e.target.value) : keyDownLetter(e.target.parentNode.value);
  })

})

export { finalWord }