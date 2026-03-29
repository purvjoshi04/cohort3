import express from "express";

const app = express();

let countNum = 0;

function middleware(req, res, next) {
  countNum = countNum + 1;
  console.log(`Visitor: ${countNum}`);
  next();
}

app.use(middleware);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/count", (req, res) => {
  res.json({
    count: countNum,
  });
});

app.listen(3000);