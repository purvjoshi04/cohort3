import fs from "fs";

const file = "todos.json";

export function readTodo(callback) {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) return callback([]);
    try {
      const todos = JSON.parse(data);
      callback(Array.isArray(todos) ? todos : []);
    } catch (error) {
      callback([]);
    }
  });
}

export function createTodo(task, callback) {
  fs.readFile(file, "utf-8", (err, data) => {
    let todos = [];
    if (!err && data) {
      try {
        todos = JSON.parse(data);
        if (!Array.isArray(todos)) todos = [];
      } catch {
        todos = [];
      }
    }
    const nextId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    const newTodo = { id: nextId, task };
    todos.push(newTodo);
    fs.writeFile(file, JSON.stringify(todos, null, 2), (err) => {
      if (callback) callback(!err, newTodo);
    });
  });
}

export function updateTodo(id, task, callback) {
  fs.readFile(file, "utf-8", (err, data) => {
    let todos = [];
    if (!err && data) {
      try {
        todos = JSON.parse(data);
        if (!Array.isArray(todos)) todos = [];
      } catch {
        todos = [];
      }
    }
    const idNum = Number(id);
    const todo = todos.find((t) => t.id === idNum);
    if (!todo) {
      if (callback) callback(false);
      return;
    }
    todo.task = task;
    fs.writeFile(file, JSON.stringify(todos, null, 2), (err) => {
      if (callback) callback(!err);
    });
  });
}

export function deleteTodo(id, callback) {
  fs.readFile(file, "utf8", (err, data) => {
    let todos = [];
    if (!err && data) {
      try {
        todos = JSON.parse(data);
        if (!Array.isArray(todos)) {
          todos = [];
        }
      } catch (e) {
        todos = [];
      }
    }
    const idNum = Number(id);
    const initialLength = todos.length;
    todos = todos.filter((t) => t.id !== idNum);
    if (todos.length === initialLength) {
      callback(false);
      return;
    }
    fs.writeFile(file, JSON.stringify(todos, null, 2), (err) => {
      if (err) {
        callback(false);
      } else {
        callback(true);
      }
    });
  });
}
