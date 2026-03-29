import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { notifications, totalNotificationSelector, completedTodosSelector, pendingTodosSelector } from './atoms'
import axios from 'axios'

function App() {
  return <RecoilRoot>
    <MainApp />
  </RecoilRoot>
}

function MainApp() {
  const [todos, setTodos] = useRecoilState(notifications)
  const totalTodoCount = useRecoilValue(totalNotificationSelector);
  const completedTodos = useRecoilValue(completedTodosSelector);
  const pendingTodos = useRecoilValue(pendingTodosSelector);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos/")
      setTodos(response.data)
      console.log('Todos fetched:', response.data.length, 'items')
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const clearTodos = () => {
    setTodos([])
  }

  return (
    <>
      <div style={{ padding: '20px' }}>
        <button onClick={fetchTodos} style={{ marginRight: '10px' }}>
          Get All Todos
        </button>
        <button onClick={clearTodos} style={{ marginRight: '10px' }}>
          Clear Todos
        </button>
        <div style={{ margin: '20px 0' }}>
          <h3>Todo Statistics:</h3>
          <p>Total Todos: {totalTodoCount}</p>
          <p>Completed: {completedTodos.length}</p>
          <p>Pending: {pendingTodos.length}</p>
        </div>

        {todos.length > 0 && (
          <div>
            <h3>All Todos:</h3>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {todos.map(todo => (
                <div key={todo.id} style={{ 
                  padding: '8px', 
                  margin: '4px 0', 
                  border: '1px solid #ccc',
                  backgroundColor: todo.completed ? '#e8f5e8' : '#fff3e0'
                }}>
                  <strong>#{todo.id}</strong> - {todo.title} 
                  <span style={{ 
                    marginLeft: '10px', 
                    color: todo.completed ? 'green' : 'orange' 
                  }}>
                    {todo.completed ? '✅ Completed' : '⏳ Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App