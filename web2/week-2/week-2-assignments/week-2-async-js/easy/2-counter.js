let countValue = 0;

for (let i = 0; i < 1000; i++) {
  setTimeout(() => {
    countValue++;
    console.log(countValue);
  }, i * 1000);
}   