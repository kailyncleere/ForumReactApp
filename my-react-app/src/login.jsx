import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './loginRegister.css'
import Home from './home'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post('http://localhost:3000/login', formData);
    if (response.data.success)
    {
      alert(response.data.message);
      console.log('Navigating to home...');
      navigate('/home');
    }
    else {
      alert(response.data.message);
    }
  }
  catch (err) {
    console.error('Login error:', err);
    alert('An error occurred during login. Please try again.');
  }
};

  return (
    <>
      <div className= 'formBackground'>
        <div className= 'form'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='inputUser'>
            <label htmlFor="username"><strong>Username</strong></label>
          <input
            type="text"
            placeholder="username" 
            required
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          </div>
          <div className='inputUser'>
            <label htmlFor="password"><strong>Password</strong></label>
          <input 
            type='password' 
            placeholder="password" 
            required
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          </div>
          <button className= 'formButtons' type="submit">Login</button>
          <p>Don't have an account?</p>
          <button className= 'formButtons' type="button" onClick={() => window.location.href = '/register'}>Register</button>
        </form>
        </div>
      </div>
    </>
  );
}

export default Login
