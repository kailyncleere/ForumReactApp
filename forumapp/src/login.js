import React from 'react'

function Login() {
    return (
        <div>
            <h1>Login</h1>
            <form>
                <div>
                    <label>Username:<input type="text" name="username" /></label>
                </div>
                <div>
                    <label>Password:<input type="password" name="password" /></label>
                </div>
                    <button type="submit">Login</button>
            </form>
        </div>
    )
    }

export default Login