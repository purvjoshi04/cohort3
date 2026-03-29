import { useState } from "react";
import Counter from "./useCounter.jsx"
import { useFetch } from "./useFetch.js"

function App() {
  const [currentPost, setCurrentPost] = useState(1)
  const { post, loading } = useFetch("https://jsonplaceholder.typicode.com/todos/" + currentPost);
  if (loading) {
    return <p>Loading....</p>
  }
  return (
    <div>
      <Counter />
      <div>
        <button onClick={() => setCurrentPost(1)}>1</button>
        <button onClick={() => setCurrentPost(2)}>2</button>
        <button onClick={() => setCurrentPost(3)}>3</button>
        {JSON.stringify(post, null, 2)}
      </div>
    </div>
  )
}

export default App
