import { SQL } from "bun";

const pg = new SQL("postgresql://postgres:postgres123@localhost:5432/postgres");

async function connectDB() {
    await pg.connect();
    const response = await pg`SELECT * FROM users;`;
    // const todo = await pg`insert into todos`
    console.log(response);
}

connectDB();