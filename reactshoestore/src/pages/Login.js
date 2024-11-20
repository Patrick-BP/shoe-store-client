import React from 'react'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate();

    function login(){
        navigate('/layout')
    }

    
  return (
    
    <div className="login-container">
        <div className="login-form">
            <h1>Administrator Login</h1>
            <form>
                <div className="input-group">
                    <label htmlFor="username">USERNAME</label>
                    <input type="email" id="username" placeholder="amit@gmail.com" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">PASSWORD</label>
                    <input type="password" id="password" required /> 
                </div>
                <div className="button-group">
                    <button type="submit" onClick={login()} className="login-btn">LOGIN</button>
                    <button type="reset" className="reset-btn">RESET</button>
                </div>
            </form>
            <Link to="/layout">Home</Link>
        </div>
        <div className="login-image"></div>
    </div>
    
  )
}
