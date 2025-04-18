import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './loginRegister.css'
import Home from './home'

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', formData);
            if (response.data.success) {
                alert(response.data.message);
                console.log('Navigating to home...');
                navigate('/home');
            }
            else {
                alert(response.data.message);
            }
        }
        catch (err) {
            console.error('Registration error:', err);
            alert('Registration failed!');
        }
    };

    return (
        <div className='formBackground'>
            <div className='form'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className='inputUser'>
                <label htmlFor="username"><strong>Username</strong></label>
                <input
                    type="text"
                    placeholder="username" required
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                </div>
                <div className='inputUser'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input 
                    type='password' 
                    placeholder="password" required
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                </div>
                <button className='formButtons' type="submit">Register</button>
                <p>Already have an account?</p>
                <button className='formButtons' type="button" onClick={() => window.location.href = '/'}>Login</button>
            </form>
        </div>
        </div>
    );
}

export default Register;
