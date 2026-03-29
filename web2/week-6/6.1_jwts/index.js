import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const JWT_SECRET = "";
const users = [];

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  users.push({
    username: username,
    password: password,
  });

  res.json({
    message: "You have signed up!",
  });
  console.log(users);
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

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
      message: token,
    });
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
  console.log(users);
});

app.get("/me", (req, res) => {
  const token = req.headers.token;

  let decodedInfo;
  try {
    decodedInfo = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const username = decodedInfo.username;

  let userFind = users.find(user => user.username === username);

  if (userFind) {
    res.json({
      user: userFind.username,
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
});

app.listen(3000);
