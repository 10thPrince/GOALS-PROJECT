import { useState } from 'react'
import { Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>

    </>
  )
}

export default App
