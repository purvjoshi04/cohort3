import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const JWT_SECRET = "";
app.use(express.json());

const users = [];

app.use(express.static("./public"))

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username && !password) {
        res.status(401).json({
            message: "Please add username and password in body!",
        });
    } else {
        users.push({
            username,
            password,
        });
        res.json({
            message: "You have signed up!",
        });
        
    }
});

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username && !password) {
        res.status(401).json({
            message: "Please add username and password in body!",
        });
    }

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        const token = jwt.sign(
            {
                username: username,
            },
            JWT_SECRET
        );

        res.json({
            token: token,
        });
    } else {
        res.status(403).send({
            message: "Invalid username or password",
        });
    }
});

function auth(req, res, next) {
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token, JWT_SECRET);

    if (decodedInfo.username) {
        req.username = decodedInfo.username;
        next();
    } else {
        res.json({
            message: "You are not logged in!"
        })
    }
}

app.get("/me", auth, (req, res) => {
    const foundUser = users.find(u => u.username === req.username);
    res.json({
        username: foundUser.username,
        password: foundUser.password
    });
});

app.listen(3000);
