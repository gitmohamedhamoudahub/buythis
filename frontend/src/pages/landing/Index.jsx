import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to Shopping App!</h1>
      <p>Sign in to access your shopping lists and items.</p>
      <Link to="/auth">
        <button className="auth-btn">Sign In / Sign Up</button>
      </Link>
    </div>
  );
};

export default LandingPage;
