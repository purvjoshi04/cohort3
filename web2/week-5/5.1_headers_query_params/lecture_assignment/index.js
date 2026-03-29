import express from "express";

const app = express();

app.get("/sum", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({
    sum: a + b,
  });
});

app.get("/multiply", (req, res)=>{
    const a = req.query.a;
  const b = req.query.b;
  res.json({
    sum: a * b,
  });
});

app.get("/devide", (req, res)=>{
    const a = req.query.a;
  const b = req.query.b;
  res.json({
    sum: a / b,
  });
});

app.get("/subtract", (req, res)=>{
    const a = req.query.a;
  const b = req.query.b;
  res.json({
    sum: a - b,
  });
});


app.listen(3000);
