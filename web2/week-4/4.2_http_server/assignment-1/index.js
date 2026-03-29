import express from "express";

const app = express();
app.use(express.json());

let todos = [];
let todoId = 1;

app.get("/", (req, res) => {
  res.json(todos);
});

app.post("/createTodo", (req, res) => {
  const { task } = req.body;
  if (!task) return res.sendStatus(400);
  const todo = { id: todoId++, task };
  todos.push(todo);
  res.sendStatus(201);
});

app.put("/updateTodo/:id", (req, res) => {
  const id = Number(req.params.id);
  const { task } = req.body;
  const todo = todos.find((t) => t.id === id);
  if (!todo) return sendStatus(404);
  todo.task = task;
  res.json(todo);
});

app.delete("/deleteTodo/:id", (req, res) =>{
    const id = Number(req.params.id);
    const arrayLength = todos.length;
    todos = todos.filter(t => t.id !== id);
    if(todos.length === arrayLength) return sendStatus(404);
    res.json({message: `Todo with id ${id} is deleted`});
})

app.listen(3001);