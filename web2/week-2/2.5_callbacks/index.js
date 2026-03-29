// callback hell example : Write code that:
// logs hi after 1 second
// logs hello 3 seconds after step 1
// logs hello there 5 seconds after step 2

setTimeout(() => {
  console.log("hi");
  setTimeout(() => {
    console.log("hello");
  }, 3000);
  setTimeout(() => {
    console.log("hello there");
  }, 5000);
}, 1000);

// slighly better approach for above example

function promisifiedTimout(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

promisifiedTimout(1000).then(() => {
  console.log("hi");
  promisifiedTimout(3000).then(() => {
    console.log("hello");
  });
  promisifiedTimout(5000).then(() => {
    console.log("hello there");
  });
});

// better approach promise chaining

function promiseChaining(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

promiseChaining(1000)
  .then(() => {
    console.log("hi");
    return promiseChaining(3000);
  })
  .then(() => {
    console.log("hello");
    return promiseChaining(5000);
  })
  .then(() => {
    console.log("hello there");
  });

// more better and mostly used approach

function asycPromise(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

async function printStatement() {
  await asycPromise(1000);
  console.log("hi");
  await asycPromise(3000);
  console.log("hello");
  await asycPromise(5000);
  console.log("hello there");
}

printStatement();

// assignmnet: promisfied version of setTimout fetch fs.readfile

const fs =require('fs')

function promiseFileRead() {
  return new Promise((resolve, reject) => {
    fs.readFile('test.txt', 'utf-8', (data, err)=>{
        if (err) {
            reject('File not found');
        }
        else {
            resolve(data);
        }
    });
  });
}

promiseFileRead().then((data)=>{
    console.log(`File data ${data}`);
}).catch((e) => {
    console.log(e);
})