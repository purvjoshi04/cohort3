let taskId = 0;

const input = document.getElementById("new-task-input");
const addButton = document.getElementById("add-task-btn");

addButton.addEventListener("click", () => {
  const taskText = input.value.trim();
  if (!taskText) return;

  const task = createTaskElement(taskText);
  document.getElementById("todo-list").appendChild(task);
  input.value = "";
});

function createTaskElement(text) {
  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.id = `task-${taskId++}`;
  task.textContent = text;

  addDragEvents(task);
  return task;
}

function addDragEvents(task) {
  task.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", task.id);
  });
}

document.querySelectorAll(".task-list").forEach(list => {
  list.addEventListener("dragover", (e) => e.preventDefault());

  list.addEventListener("drop", (e) => {
    const taskId = e.dataTransfer.getData("text/plain");
    const task = document.getElementById(taskId);
    e.target.appendChild(task);
  });
});
