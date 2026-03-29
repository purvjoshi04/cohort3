const fs = require('fs');

function readFilePromisified(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

readFilePromisified('/Users/purvjoshi/Documents/web3/week-2_js_advance/2.2_promises/test.txt')
  .then(content => {
    console.log('File content:', content);
  })
  .catch(error => {
    console.error('Error reading file:', error);
  });

let sum = 0;
for (let i = 0; i < 1e10; i++) {
  sum += i;
}
console.log('Expensive operation done:', sum);