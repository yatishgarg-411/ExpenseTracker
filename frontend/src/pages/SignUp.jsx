import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Eye, EyeOff } from 'lucide-react';
import './SignUp.css';

const SignUp = () => {
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
              <input type="text" placeholder="Enter your full name" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Create a password" />
              <Eye className="eye-icon" />
            </div>

            <div className="form-group password-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" placeholder="Confirm your password" />
              <EyeOff className="eye-icon" />
            </div>

            <button type="submit" className="register-button">
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
