import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='mainContainer'>   
    <img src='https://img.freepik.com/premium-photo/thoughtful-arabic-man-doing-grocery-shopping-calculating-prices-supermarket_116547-18929.jpg'/>
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">Shopping App</span>! 🛒
        </h1>
        <p className="text-gray-600 mb-6">
          Easily manage your shopping lists, track your items, and share lists with family and friends.
        </p>

        <ul className="text-gray-700 text-left mb-6">
          <li>✅ Create and manage multiple lists</li>
          <li>✅ Track item prices and availability</li>
          <li>✅ Share lists with others in real time</li>
        </ul>

        <Link to="/auth">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all">
            Sign In / Sign Up
          </button>
        </Link>
      </div>
    </div>
    </div>

  );
};

export default LandingPage;
