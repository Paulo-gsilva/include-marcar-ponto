if (typeof document !== "undefined") {
  const buttonPoint = document.querySelector(".inicio-contagem-button");
  const hourPoint = document.querySelector(".contador");

  function timeNow() {
    const hoursNow = new Date().getHours();
    const minutesNow = new Date().getMinutes();
    const secondsNow = new Date().getSeconds();
    let minutes = minutesNow,
      seconds = secondsNow;
    if (minutesNow < 10) minutes = "0" + minutes;
    if (secondsNow < 10) seconds = "0" + seconds;

    const timeNow = `${hoursNow}:${minutes}:${seconds}`;

    return timeNow;
  }

  if (hourPoint) {
    setInterval(() => {
      const time = timeNow();
      hourPoint.innerHTML = time;
    }, 1000);
  }

  exports.descriptionPoint = document.querySelector(".descricao-input");
}
