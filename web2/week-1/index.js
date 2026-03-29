let firstName = "John";
const age = 30;
var isStudent = true;

console.log(firstName);
console.log(age);
console.log(isStudent);

// Assignment : Create a variable for each of the following: your favorite color, your height in centimeters, and whether you like pizza. Use appropriate variable declarations (let, const, or var). Try logging it using console.log

let color = "black";
const height = 162;
var likedPizza = true;

console.log(color);
console.log(height);
console.log(likedPizza);

let number = 42; // Number
let string = "Hello World"; // String
let isActive = false; // Boolean
let numbers = [1, 2, 3]; // Array

let sum = 10 + 5; // Arithmetic operator
let isEqual = 10 === 10; // Comparison operator
let isTrue = true && false; // Logical operator

// Function declaration
function greet(name) {
  return "Hello, " + name;
}

// Function call
let message = greet("John"); // "Hello, John"
console.log(message);

// Assignment #1
// Write a function sum that finds the sum of two numbers.
// Side quest - Try passing in a string instead of a number and see what happens?

function sumNum(num1, num2) {
  return num1 + num2;
}

let sumOfNum = sumNum(10, 10);
let sumOfNumstr = sumNum(10, "10");

console.log(sumOfNum);
console.log(sumOfNumstr);

// Assignment #2
// Write a function called canVote that returns true or false if the age of a user is > 18

function canVote(age) {
  if (age >= 18) {
    return "You are eligible to vote!";
  } else {
    return "You are not eligible to vote!";
  }
}

let canVoteDec = canVote(17);
console.log(canVoteDec);

// Assignment
// Write an if/else statement that checks if a number is even or odd. If it's even, print "The number is even." Otherwise, print "The number is odd."

function numCheck(num) {
  if (num % 2 == 0) {
    return "Number is even!";
  } else {
    return "Number is odd!";
  }
}

let numCheckDec = numCheck(10);
console.log(numCheckDec);

// Assignment
// Write a function called sum that finds the sum from 1 to a number

function sumFind(num) {
  let finalSum = 0;
  for (let i = 1; i <= num; i++) {
    finalSum += i;
  }
  return finalSum;
}

console.log(sumFind(10));

// Write a function that takes a user as an input and greets them with their name and age

function greetUsr(name, age) {
  let user = {
    name: name,
    age: age,
  };
  return `hello ${user.name}, your age is ${user.age}`;
}

console.log(greetUsr("purv", 21));

// Assignment #2
// Write a function that takes a new object as input which has name , age  and gender and greets the user with their gender (Hi Mr/Mrs/Others harkirat, your age is 21)

function greet(user) {
  if (user.age >= 18) {
    return `Hello Mr. ${user.name} your age is ${user.age} and you are eligible for voting.`;
  } else {
    return `Hello Mr. ${user.name} your age is ${user.age} and you are not eligible for voting.`;
  }
}

console.log(greet({ name: "purv", age: 21, gender: "male" }));

// Write a function that takes an array of numbers as input, and returns a new array with only even values.

function filterEven(nums) {
  return nums.filter((evenNum) => evenNum % 2 == 0);
}

console.log(filterEven([10, 21, 31, 11, 100]));

// Write a function that takes an array of users as inputs and returns only the users who are more than 18 years old

function userAge(users) {
  return users.filter(user=> user.age > 18);
}

const usersArray = [
    { name: "Alice", age: 17, gender: "female" },
    { name: "Bob", age: 21, gender: "male" },
    { name: "Charlie", age: 18, gender: "male" },
    { name: "Diana", age: 25, gender: "female" }
];

const adults = userAge(usersArray);
console.log(adults);


// Create a function that takes an array of objects as input,
// and returns the users whose age > 18 and are male


function getMales(usersObj) {
    const result = {};

    for (let key in usersObj) {
        const user = usersObj[key];
        if (user.age > 18 && user.gender == 'male') {
            result[key] = user;
        }
    }

    return result;
}


console.log(getMales( {
    user1: { name: "Alice", age: 17, gender: "female" },
    user2: { name: "Bob", age: 21, gender: "male" },
    user3: { name: "Charlie", age: 19, gender: "male" },
    user4: { name: "Diana", age: 25, gender: "female" },
    user5: { name: "Eli", age: 18, gender: "male" }
}));
