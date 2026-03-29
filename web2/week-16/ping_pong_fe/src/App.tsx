import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null); 
  const inputRef = useRef<HTMLInputElement>(null);
  const sendMessage = () => {
    if(!socket) {
      return;
    }
    const message = inputRef.current?.value ?? "";
    socket.send(message);

  }

  useEffect(()=> {
    const ws = new WebSocket("ws://localhost:3030");

    setSocket(ws);

    ws.onmessage = (event) => {
      alert(event.data)
    }
  }, [])

  return (
    <div>
      <input ref={inputRef} type="text" placeholder='write ping' />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App
