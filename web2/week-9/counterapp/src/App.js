import { useState } from 'react';
import './App.css';

function App() {

  const [count, setCount] = useState(0);

  function buttonHandler() {
    return setCount(count + 1)
  }

  return (
    <div>
      <button onClick={buttonHandler}>Count {count}</button>
    </div>
  );
}

export default App;
