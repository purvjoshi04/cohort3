import './App.css';
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from './routes/routes';

function App() {
  return (
    <div>
      <BrowserRouter>
          <AppRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
