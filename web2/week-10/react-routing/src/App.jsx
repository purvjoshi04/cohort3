import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from "react-router-dom"

function Header() {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </>
  )
}

function Layout() {
  return (
    <div style={{background: "red", height: "100vh"}}>
      <Header />
      <div style={{background: "green", height: "80vh"}}>
      <Outlet />
      </div>
      Footer
    </div>
  )
}

function Home() {
  return (
    <h1>Hello from Home route</h1>
  )
}
function About() {
  return (
    <h1>Hello from About route</h1>
  )
}
function Contact() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Hello from Contact route</h1>
      <button onClick={() => navigate("/")}>Go back to Home route</button>
    </>
  )
}

function ErrorPage() {
  return (
    <h1>Page not found!</h1>
  )
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
