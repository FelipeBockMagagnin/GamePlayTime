import React from 'react';

export default function Login() {
    return (
        <div className="container shadow-card center col-md-4" style={{ marginTop: 20, padding: 30 }}>
            <div className="container col-md-12">

                <br></br>

                Email: <input name='email' type="email" className='form-control'></input>

                <br></br>

                Password: <input name='password' type='password' className='form-control'></input>
            </div>

            <button className='btn btn-secondary' style={{ marginTop: 40 }}>Register</button>
            <button className='btn btn-success' style={{ marginTop: 40, marginLeft: 20 }}>Login</button>

            <br></br>

            <button className='btn btn-danger' style={{ marginTop: 20 }}>Logout</button>
        </div>
    );
}