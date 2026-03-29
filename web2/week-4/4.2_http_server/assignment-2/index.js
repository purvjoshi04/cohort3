import express from "express";
import { createTodo, readTodo, updateTodo, deleteTodo } from "./component.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  readTodo((todos) => res.json(todos));
});

app.post("/createTodo", (req, res) => {
  const { task } = req.body;
  if (!task) return res.sendStatus(400);
  createTodo(task);
  res.sendStatus(201);
});

app.put("/updateTodo/:id", (req, res)=>{
    const id = Number(req.params.id);
    const { task } = req.body;
    if (!task ) return res.sendStatus(400);
    updateTodo(id, task);
    res.sendStatus(200);
})

app.delete('/deleteTodo/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.sendStatus(400);
  deleteTodo(id, (success) => {
    if (success) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  });
});

app.listen(3002);
