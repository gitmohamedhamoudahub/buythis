import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/index';
import LoginForm from '../login_form';
export const ProtectedRoutes = () => {
  const { cookies } = useAuth();

  return cookies.token ? <Outlet /> : <LoginForm/>;
};
