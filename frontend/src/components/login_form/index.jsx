import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAppContext from '../../hooks/auth/index.jsx';
import './LogIn.css';

const LoginForm = ({ setNewUser }) => {
  const nav = useNavigate();
  const { login } = useContext(AuthAppContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleClick = () => {
    console.log('Login Started', formData.email);
    setNewUser(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Login for', formData.email);

    if (formData.email === '' || formData.password === '') {
      console.log('Please fill in all fields');
      return;
    }
    await login(formData);
    console.log('Success ....');
    nav('/');
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form autoComplete="off" onSubmit={onSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={onChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={onChange}
              minLength="6"
              required
            />
          </div>

          <button type="submit" className="login-btn">Log In</button>
        </form>

        <p className="signup-text">
          Don't have an account?{' '}
          <button onClick={handleClick} className="signup-btn">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
