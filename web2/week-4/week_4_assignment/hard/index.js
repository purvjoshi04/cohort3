const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/user.js");
const todoRoutes = require("./routes/todo.js");
const { default: mongoose } = require("mongoose");

const app = express();
const port = process.env.PORT;

app.use(express.json());


app.get("/healthy", (req, res)=> res.send("I am Healthy"));

//  start writing your routes here

app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

mongoose.connect(process.env.MONGO_DB_URL);


app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));

