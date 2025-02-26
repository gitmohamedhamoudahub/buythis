import { createContext, useContext, useState, useEffect } from "react";

import { useCookies } from 'react-cookie';
import api from '../../data/axios'; 

const AuthAppContext = createContext();

export const AuthAppProvider = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies();

const login = async (formData) => {
    try {
      console.log('login in processing');
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
  

  //const value = useMemo(() => ({ cookies, login, logout, signUp }), [cookies]);

  return <AuthAppContext.Provider value={{ cookies, login, logout, signUp} }>
    {children}
    </AuthAppContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthAppContext);
};

export default AuthAppContext;
