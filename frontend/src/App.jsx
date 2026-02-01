import React from 'react'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import Forgot from './Auth/Forgot'
import Home from './pages/Home'
import {Routes, Route} from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App