import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState(false);

  function addTodo() {
    setTodos([
      ...todos,
      {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        done: done
      }
    ]);
  }

  return (
    <div>
      <input id='title' type='text' placeholder='todo title' />
      <input id='description' type='text' placeholder='todo description' />

      <div>
        <input type="radio" id="false" name="done" onChange={() => setDone(false)} />
        <label htmlFor="false">false</label>
      </div>

      <div>
        <input type="radio" id="true" name="done" onChange={() => setDone(true)} />
        <label htmlFor="true">True</label>
      </div>

      <button onClick={addTodo}>Add Todo</button>
    <div>
      {
        todos.map((todo)=>(
          <Rendertodo
            title={todo.title}
            description={todo.description}
            done={todo.done ? "True" : "False"}
            />
        ))
      }
    </div>
    </div>
  );
}

function Rendertodo(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
      <h3>{props.done}</h3>
    </div>

  )
}

export default App;
