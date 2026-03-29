import express from "express";

const app = express();

app.post("/signup", (req, res) => {
    res.send("http-server signup route")
});

app.post("/signin", (req, res) => {
    res.send("http-server signin route")
});

app.get("/chat", (req, res) => {
    res.send("http-server signin route")
});

app.listen(3001)