import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to the Forum</h1>
            <p>This is a simple forum application.</p>
            <p>
                <Link to="/login">Login</Link> to your account or <Link to="/register">Register</Link> a new account.
            </p>
        </div>
    );
}

export default Home;