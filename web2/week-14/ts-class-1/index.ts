function gretting(name: string) {
    return `Hello ${name}`;
}

console.log(gretting("User"));

function sum(num1: number, num2: number) {
    return num1 + num2;
}

console.log(sum(2, 2))


function isLegal(age: number) {
    if (age > 18) {
        return true
    } else {
        return false
    }
}

let obj1 = isLegal(13);

console.log(obj1)


function delayedCall(fn: () => void) {
    setTimeout(fn, 1000);
}

delayedCall(() => {
    console.log("hell0 there")
})

interface User {
    userName: string,
    age: number,
}

const isLegalNew = (user: User): boolean => {
    if (user.age > 18) {
        return true;
    } else {
        return false;
    }
}

let userObj: User = {
    userName: "purv",
    age: 19
}

const ans = isLegalNew(userObj);

if (ans) {
    console.log("You are legal");
} else {
    console.log("You are not legal");
}


interface People {
    name: string,
    age: number,
    greet: () => string
}

let person: People = {
    name: 'purv',
    age: 21,
    greet: () => `hello ${person.name} your age is ${person.age}`
}

interface PeopleNew {
    name: string,
    age: number,
    isLegal(): boolean
}


class ManagerClass implements PeopleNew {
    constructor(public name: string, public age: number) {
        this.name = name;
        this.age = age;
    }
    isLegal() {
        return this.age > 18
    }
}

let user = new ManagerClass("John", 23);
console.log(user.isLegal());


type Employee = {
    name: string;
    startDate: string;
}

type Manager = {
    name: string;
    department: string;
}

type TeamLead = Employee & Manager;

let e: Employee = {
    name: "John",
    startDate: "01/02/2000"
}

let m: Manager = {
    name: "Marcus",
    department: "Product"
}

let t: TeamLead = {
    name: "test",
    startDate: "12/3/1995",
    department: "Product Lead"
}


interface Users {
    firstName: string
    lastName: string
    age: number
}


function isLegalOrNot(users: Users[]) {
    return users.filter(x => x.age >= 18)
}

console.log(isLegalOrNot([{
    firstName: "Purv",
    lastName: "Joshi",
    age: 21
}, {
    firstName: "User2",
    lastName: "user2",
    age: 12
}]));