import React from 'react'
import './App.css'
import { useCounterStore } from './store/atoms/counter.js'

function Increase() {
  const increase = useCounterStore((state)=> state.increase);
  return (
    <div>
      <button onClick={increase}>Increase</button>
    </div>
  )
}

function Decrease() {
  const decrease = useCounterStore((state)=> state.decrease);
  return (
    <div>
      <button onClick={decrease}>Decrease</button>
    </div>
  )
}

function CurrentCount() {
  const count = useCounterStore((state)=> state.count)
  return (
    <div>
      {count}
    </div>
  )
}

function Counter() {

  return (
    <>
      <CurrentCount />
      <Increase />
      <Decrease />
    </>
  )
}

function App() {
  return (
    <div>
      <Counter />
    </div>
  )
}

export default App
