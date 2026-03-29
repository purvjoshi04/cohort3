import express from "express"

const app = express();
let userCount = 0;

function userCountMiddleware(req, res, next) {
  userCount = userCount + 1;
  console.log(`The user count is ${userCount}`);
  next();
}

app.get("/sum", userCountMiddleware ,(req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({
    sum: a + b,
  });
});

app.get("/multiply", userCountMiddleware ,(req, res) => {
  userCountMiddleware();
  const a = req.query.a;
  const b = req.query.b;
  res.json({
    sum: a * b,
  });
});

app.get("/devide", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  res.json({
    sum: a / b,
  });
});

app.get("/subtract", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  res.json({
    sum: a - b,
  });
});

app.listen(3000);
