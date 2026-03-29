interface User {
    id: string
    userName: string
    age: number
    email: string
    password: string
}

//Pick

type UpdateProps = Pick<User, 'userName' | 'age' | 'email'>

//Partial
type UpdatePropsOptional = Partial<UpdateProps>

function sumOfAge(user: UpdatePropsOptional) {
    console.log(`Name: ${user.userName}, age: ${user.age}, email: ${user.email}`)
}

sumOfAge({ userName: "John", age: 14 });


type Admin = {
    adminName: string;
    age: number
}

//Readonly
const admin: Readonly<Admin> = {
    adminName: "Martin",
    age: 46
}

admin.adminName = "wqdqwqwdqw";
console.log(admin.adminName)

//Record
type Users = Record<string, { id: string, username: string }>

const users: Users = {
    "eqwdwqd": {
        id: "eqwdwqd",
        username: "Henry"
    }
}

interface Employee {
    id: string;
    name: string;
}

const employeesMap = new Map<string, Employee>();

employeesMap.set('abc123', { id: 'abc123', name: 'John Doe' });
employeesMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });

console.log(employeesMap.get('abc123'));


type Event = 'click' | 'scroll' | 'mousemove';
type ExcludeEvent = Exclude<Event, 'scroll'>;z1

const handleEvent = (event: ExcludeEvent) => {
    console.log(`Handling event: ${event}`);
};

handleEvent('click');