import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', formData);
            if (response.data) {
                alert(response.data.message);
            }
        } catch (err) {
            alert('Registration failed!');
        }
    };

    return (
        <div>
            <h2>Register</h2>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
