import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
   <>
    <h1>Home</h1>
   <button>Logout</button>
   <Link to="/login">Login</Link>
   </>
    
  )
}

export default Home