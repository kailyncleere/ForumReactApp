import React from 'react'

function Register() {
    return (
        <div>
            <form>
                <h1>Register</h1>
                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" id="firstname" name="firstname" />
                </div>
                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" id="lastname" name="lastname" />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                    <button type="submit">Register</button>
            </form>
        </div>
    )
    }

export default Register