import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Eye } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="wallet-icon-wrapper">
            <Wallet className="wallet-icon" />
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
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div className="input-wrapper relative">
                <input
                  type="password"
                  className="input-field pr-10"
                  placeholder="Enter your password"
                />
                <button type="button" className="eye-icon">
                  <Eye className="eye-icon-svg" />
                </button>
              </div>
            </div>

            <div>
              <button type="submit" className="submit-btn">
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
