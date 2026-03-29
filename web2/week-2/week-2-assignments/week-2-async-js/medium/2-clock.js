function showClock() {
  console.log(new Date().toLocaleTimeString());
  setTimeout(showClock, 1000);
}

showClock();