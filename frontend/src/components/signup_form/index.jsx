import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import './SignUp.css'; // Import the updated CSS file

const SignUp = ({ setNewUser }) => {
  const nav = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      console.log('Passwords do not match');
    } else {
      await signUp(formData);
      nav('/dashboard');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign Up</h2>
        <form autoComplete="off" onSubmit={onSubmit}>
          <div className="input-group">
            <label htmlFor="name1">Name</label>
            <input
              type="text"
              id="name1"
              name="name"
              value={formData.name}
              placeholder="First and Last Name"
              onChange={onChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email1">Email</label>
            <input
              type="email"
              id="email1"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={onChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password1">Password</label>
            <input
              type="password"
              id="password1"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={onChange}
              minLength="6"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              placeholder="Confirm Password"
              onChange={onChange}
              minLength="6"
              required
            />
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <p className="signin-text">
          Already have an account?{' '}
          <button onClick={() => setNewUser(false)} className="signin-btn">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
