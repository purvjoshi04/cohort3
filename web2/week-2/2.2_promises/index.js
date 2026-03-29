class Rectangle {
  constructor(height, width, color) {
    this.height = height;
    this.width = width;
    this.color = color;
  }

  area() {
    console.log(this.width * this.height);
  }

  paint() {
    console.log(`Color of rectangle is ${this.color}.`);
  }
}

const rect = new Rectangle(3, 4, "red");
rect.area();
rect.paint();


// map function
const map = new Map();
map.set("name", "purv");
map.set("age", 21);
console.log(map.get("name"));


// promise

function setTimeoutPromisified(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function callback() {
  console.log("3 seconds have passed!");
}

setTimeoutPromisified(3000).then(callback);



// create promisified function for fs.readfile, fs.writefile.


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

function writeFilePromisified(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, 'utf-8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('File written successfully');
      }
    });
  });
}

readFilePromisified('test.txt')
  .then(content => {
    console.log('File content:', content);
  })
  .catch(error => {
    console.error('Error reading file:', error);
  });

writeFilePromisified('test.txt', 'This is a new line of text.')
  .then(message => {
    console.log(message);
  })
  .catch(error => {
    console.error('Error writing file:', error);
  });