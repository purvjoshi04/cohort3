import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("on mount")
    let clock = setInterval(() => {
      console.log("inside interval")
      setCount((count) => {
        return count + 1
      })
    }, 1000)
    return () => {
      console.log("on unmount")
      clearInterval(clock)
    }
  }, [])

  return (
    <h1>
      {count}
    </h1>
  )
}

function App() {
  let [countVisible, setCountVisible] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setCountVisible(count => !count)
    }, 3000)
  }, [])
  return (
    <>
      <h1>hello</h1>
      {countVisible ? <Counter /> : null}
      <h1>there</h1>
    </>
  )
}

export default App