import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const payload =
  {
    name: formData.name,
    email: formData.email,
    password: formData.password

  }


  const addUser = async (e) => {
    e.preventDefault();
    if (formData.password != formData.confirmpassword) {
      alert("Passwords donot match");
      return;
    }
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmpassword: ''
    })
    try {
      const res = await axios.post(`http://localhost:8000/user/signup`, payload);
      alert(res.data.msg);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
      })
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("User Already Exists!!");
      }
    }

  }

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <div className="wallet-icon-wrapper">
            <Wallet className="wallet-icon" />
          </div>
          <h2 className="register-title">Create your account</h2>
          <p className="register-subtext">
            Already have an account?{' '}
            <Link to="/" className="signin-link">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="register-form-box">
          <form className="register-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                placeholder="Enter your email"
                name='email'
                value={formData.email}
                onChange={handleChange} />
            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                name='password'
                value={formData.password}
                onChange={handleChange} />
              {showPassword ? (
                <EyeOff className="eye-icon" onClick={() => setShowPassword(false)} />
              ) : (
                <Eye className="eye-icon" onClick={() => setShowPassword(true)} />
              )}</div>
            </div>

            <div className="form-group password-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                name='confirmpassword'
                value={formData.confirmpassword}
                onChange={handleChange} />
              {showConfirmPassword ? (
                <EyeOff className="eye-icon" onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <Eye className="eye-icon" onClick={() => setShowConfirmPassword(true)} />
              )}
            </div>

            <button type="submit" className="register-button" onClick={addUser}>
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
