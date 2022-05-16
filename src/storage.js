const defaultStorage = {
  config: {
    themeColor: 0,
  },
  stats: {
    games: 0,
    wins: 0,
    curstreak: 0,
    maxstreak: 0,
  }
}
let exist = window.localStorage.getItem("ZDOterm");
if (!exist) {
  window.localStorage.setItem("ZDOterm", JSON.stringify(defaultStorage));
}
