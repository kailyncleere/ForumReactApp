import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './login'
import Register from './register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div> 

    </div>
    <div className='card'>
      <Login />

      <br></br>

      <Register />
    </div>
    </>
  )
}

export default App
