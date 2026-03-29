import express from "express";

const app = express();

function middleware(req, res, next) {
  console.log(`Method is ${req.method}`);
  console.log(`Hostname is ${req.hostname}`);
  console.log(`URL is ${req.url}`);
  console.log(`Date is ${new Date()}`);
  next();
}

app.use(middleware);

app.get("/sum", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({
    sum: a + b,
  });
});

app.get("/multiply", (req, res) => {
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
