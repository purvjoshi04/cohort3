import express from "express";
import dotenv from "dotenv";

dotenv.config({path: "./secret/.env"})

const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "It Worked"
    })
})

app.listen(process.env.PORT);

console.log(process.env.PORT);
console.log(process.env.DATABASE_URL)