const { Command } = require("commander");
const program = new Command();
const fs = require("fs");

program
  .name("CLI todo")
  .description("command line creating, updating and deleting todo")
  .version("0.8.0");

program
  .command("createTodo")
  .description("create a new todo with an auto-incremented id")
  .argument("<task>", "Task description")
  .action((task) => {
    const file = "todos.json";
    fs.readFile(file, "utf8", (err, data) => {
      let todos = [];
      if (!err && data) {
        try {
          todos = JSON.parse(data);
          if (!Array.isArray(todos)) {
            todos = [];
          }
        } catch (e) {
          console.log("Invalid JSON, starting with empty list.");
          todos = [];
        }
      }
      const nextId =
        todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
      const newTodo = { id: nextId, task };
      todos.push(newTodo);
      fs.writeFile(file, JSON.stringify(todos, null, 2), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Added todo: [${newTodo.id}] ${newTodo.task}`);
        }
      });
    });
  });

program
  .command("updateTodo")
  .description("update todo with id")
  .argument("<id>", "Todo id")
  .argument("<task>", "New task description")
  .action((id,task) => {
    const file = "todos.json";
    fs.readFile(file, "utf8", (err, data) => {
      let todos = [];
      if (!err && data) {
        try {
          todos = JSON.parse(data);
          if (!Array.isArray(todos)) {
            todos = [];
          }
        } catch (e) {
          console.log("Invalid JSON, starting with empty list.");
          todos = [];
        }
      }
      const idNum = Number(id);
      const todo = todos.find((t)=> t.id === idNum);
      if(!todo){
        console.log(`No tod found with id: ${idNum}`);
        return;
      }
      todo.task = task;
      fs.writeFile(file, JSON.stringify(todos, null, 2), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Updated todo with id : ${idNum}`);
        }
      });
    });
  });

program
  .command("removeTodo")
  .description("remove todo using todo id")
  .argument("<id>", "Task id")
  .action((id) => {
    const file = "todos.json";
    fs.readFile(file, "utf8", (err, data) => {
      let todos = [];
      if (!err && data) {
        try {
          todos = JSON.parse(data);
          if (!Array.isArray(todos)) {
            todos = [];
          }
        } catch (e) {
          console.log("Invalid JSON, starting with empty list.");
          todos = [];
        }
      }
      const idNum = Number(id);
      const initialLength = todos.length;
      todos = todos.filter((t)=> t.id !== idNum);
      if(todos.length === initialLength){
        console.log(`No todo found with id : ${idNum}`);
        return;
      }
      fs.writeFile(file, JSON.stringify(todos, null, 2), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Removed todo with id: ${idNum}`);
        }
      });
    });
  });

program.parse();
