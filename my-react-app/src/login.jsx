import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3000/login', formData);
    if (response.data)
    {
      alert(response.data.message)
    }
  
  }

  return (
    <>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username" required
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <input 
            type='password' 
            placeholder="password" required
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button type="submit">Login</button>

        </form>
      </div>
    </>
  );
}

export default Login
