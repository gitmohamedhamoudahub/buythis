//import jwt from 'jsonwebtoken';

import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import api from '../../data/axios'; 
const AuthAppContext = createContext();

export const AuthAppProvider = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies();
  const [user, setUser] = useState(null);

  const login = async (formData) => {
    try {
      console.log('Login in processing');
      const res = await api.post('/auth', formData);
      console.log(res);
      setCookies('token', res.data.token);
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  const signUp = async (formData) => {
    try {
      const res = await api.post('/users', formData);
      setCookies('token', res.data.token);
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
    }
  };

  const logout = () => {
    removeCookie('token', { path: '/' });
  };

  useEffect(() => {
    // Read token from the cookies and decode it if available
    const token = cookies.token;
    if (token) {
      // Decode the token (You could use a library like jwt-decode to decode it)
      try {
        //const decodedToken = token.split('.');
        // Optionally set the user state if needed
        //setUser({ id: decodedToken.user.id, name: decodedToken.user.name });
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [cookies]);

  return (
    <AuthAppContext.Provider value={{ cookies, login, logout, signUp, user }}>
      {children}
    </AuthAppContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthAppContext);
};

export default AuthAppContext;
