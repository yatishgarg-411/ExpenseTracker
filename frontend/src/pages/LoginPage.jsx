import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';


const LoginPage = () => {

  const navigate=useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [showLoginPass, setShowLoginPass] = useState(false);


  const handleLoginChange = (e) =>{
    setLoginForm({...loginForm,[e.target.name]:e.target.value});
  };

  const handleLogin = async(e) =>{
    e.preventDefault();
    try{
      const res= await axios.post(`http://localhost:8000/user/login`,loginForm);
      localStorage.setItem("token", res.data.token);
      alert(res.data.msg);
      navigate('/dashboard');
      setLoginForm({
        email:'',password:''
      });
    }catch(error){
      if(error.response && error.response.status===404){
        alert("User not registered!!");
        navigate("/signup")
      }
    } 
   }
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="wallet-icon-wrapper">
            <Wallet className="wallet-icon-login" />
          </div>
          <h2 className="login-title">Welcome back</h2>
          <p className="login-subtitle">
            Don't have an account?{' '}
            <Link to="/signup" className="signup-link">
              Sign up here
            </Link>
          </p>
        </div>

        <div className="form-card">
          <form className="login-form">
            <div>
              <label htmlFor="email" className="input-label">
                Email address
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  className="input-field"
                  placeholder="Enter your email"
                  name='email'
                  value={loginForm.email}
                  onChange={handleLoginChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div className="input-wrapper relative">
                <input
                  type={showLoginPass ? "text" : "password"}
                  className="input-field pr-10"
                  placeholder="Enter your password"
                  name='password'
                  value={loginForm.password}
                  onChange={handleLoginChange}
                />
                <button 
                  type="button" 
                  className="eye-icon1" 
                  onClick={() => setShowLoginPass(!showLoginPass)}
                >
                  <Eye className="eye-icon-svg" />
                </button>
              </div>
            </div>

            <div>
              <button type="submit" className="submit-btn" onClick={handleLogin}>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
