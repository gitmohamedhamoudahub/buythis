import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/index';

export const ProtectedRoutes = () => {
  const { cookies } = useAuth();

  return cookies.token ? <Outlet /> : <h1>'You are not Authorized to view'</h1>;
};
